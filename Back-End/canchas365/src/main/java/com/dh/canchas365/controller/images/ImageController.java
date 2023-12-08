package com.dh.canchas365.controller.images;

import com.dh.canchas365.dto.images.ImageDTO;
import com.dh.canchas365.service.images.ImagesService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.awt.*;
import java.util.List;

@RestController
@RequestMapping("/image")
public class ImageController {

    @Autowired
    private ImagesService imagesService;

    @GetMapping("/club/{idClub}")
    public List<ImageDTO> getImagesByClub(@PathVariable("idClub") Long id ){
        return imagesService.getImagesByClub(id);
    }

    @PostMapping(
            path = "{idClub}/upload",
            consumes = MediaType.MULTIPART_FORM_DATA_VALUE,
            produces = MediaType.APPLICATION_JSON_VALUE
    )
    public void uploadImageByClub(@PathVariable("idClub") Long idClub, @RequestParam("file")MultipartFile file){
        imagesService.uploadImageByClub(idClub,file);
    }

    @GetMapping("{idClub}/download")
    public byte[] downloadImageByClub(@PathVariable("idClub") Long idClub){
        return imagesService.downloadImageByClub(idClub);
    }

    @GetMapping("{idClub}/download/{idImage}")
    public byte[] downloadImageByClubAndImage(@PathVariable("idClub") Long idClub,@PathVariable("idImage") Long idImage){
        return imagesService.downloadImagesByClubAndImage(idClub, idImage);
    }

}
