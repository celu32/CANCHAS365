package com.dh.canchas365.service.images;

import com.dh.canchas365.amazon.bucket.BucketName;
import com.dh.canchas365.amazon.fileStore.FileStore;
import com.dh.canchas365.dto.images.ImageDTO;
import com.dh.canchas365.model.Club;
import com.dh.canchas365.model.images.Images;
import com.dh.canchas365.repository.ClubRepository;
import com.dh.canchas365.repository.images.ImagesRepository;
import org.apache.http.entity.ContentType;
import org.modelmapper.ModelMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;
import java.util.*;

@Service
public class ImagesService {

    @Autowired
    private ImagesRepository imagesRepository;

    @Autowired
    private ClubRepository clubRepository;

    @Autowired
    private FileStore fileStore;


    public  void saveAll(List<Images> imagesToSave) {
        imagesRepository.saveAll(imagesToSave);
    }

    public List<ImageDTO> getImagesByClub(Long id){
        ModelMapper mapper = new ModelMapper();
        List<ImageDTO> imageDTOS = new ArrayList<>();
        for (Images im: imagesRepository.getImagesByClub(id)){
            imageDTOS.add(mapper.map(im, ImageDTO.class));
        }
        return imageDTOS;
    }

    public void uploadImageByClub(Long idClub, MultipartFile file){
        //verifico que la imagen exista
        if(file.isEmpty()){
            throw new IllegalStateException("No se puede cargar un archivo vacio [" + file.getSize()+"]");
        }

        //verifico que el archivo sea una imagen
        if(!Arrays.asList(ContentType.IMAGE_JPEG.getMimeType(), ContentType.IMAGE_PNG.getMimeType(), ContentType.IMAGE_GIF.getMimeType()).contains(file.getContentType())){
            throw new IllegalStateException("El archivo no es una imagen valida");
        }

        //verifico que el club exista
        Club club = getClub(idClub);

        //tomar algunos metadatos del archivo
        Map<String, String> metadata = new HashMap<>();
        metadata.put("Content-Type", file.getContentType());
        metadata.put("Content-Length", String.valueOf(file.getSize()));

        //Guardo la imagen en S3 y grabo en la base el link de dicha imagen ya alojada
        String fileName = String.format("Fotos/Clubes/%s/%s-%s", club.getId(), file.getOriginalFilename(), UUID.randomUUID());
        try {
            fileStore.saveImage(BucketName.CLUB_IMAGES.getBucketName(), fileName, Optional.of(metadata), file.getInputStream());
            Images image = new Images();
            image.setUrl(fileName);
            image.setClub(club);
            imagesRepository.save(image);

        } catch (IOException e) {
            throw new IllegalStateException(e);
        }

    }

    public byte[] downloadImageByClub(Long idClub) {
        //verifico que el club exista
        Club club = getClub(idClub);

        List<Images> images = imagesRepository.getImagesByClub(idClub);
        Images images1 = images.get(0);

        return images1.getImageUrl().map(key -> fileStore.dowload(BucketName.CLUB_IMAGES.getBucketName(), key)).orElse(new byte[0]);

    }

    public byte[] downloadImagesByClubAndImage(Long idClub, Long idImage) {
        Optional<Images> imagesOptional = imagesRepository.findById(idImage);
        Images image = null;
        if(imagesOptional.isPresent()){
            image=imagesOptional.get();
        }
        else{
            throw new IllegalStateException("no existe imagen");
        }
        return image.getImageUrl().map(key -> fileStore.dowload(BucketName.CLUB_IMAGES.getBucketName(), key)).orElse(new byte[0]);
    }

    private Club getClub(Long idClub) {
        Optional<Club> clubOptional = clubRepository.findById(idClub);
        Club club = null;
        if(clubOptional.isPresent()){
            club = clubOptional.get();
        }
        else{
            throw new IllegalStateException("El club con id "+ idClub +" no existe");
        }
        return club;
    }

}
