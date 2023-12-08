package com.dh.canchas365.service;

import com.dh.canchas365.exceptions.CustomFieldException;
import com.dh.canchas365.model.Category;
import com.dh.canchas365.model.Club;
import com.dh.canchas365.repository.CategoryRepository;
import com.dh.canchas365.repository.ClubRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Optional;

@Service
public class CategoryService extends CustomFieldException {
    @Autowired
    private CategoryRepository repository;

    @Autowired
    private ClubRepository clubRepository;

    public List<Category> getAll(){
        return repository.findAll();
    }
    public Category create(Category category){
        return repository.save(category);
    }

    public Category update(Category category){
        Optional<Category> optional = findById(category.getId());
        var categoryUpdate = optional.get();
        categoryUpdate.setTitle(category.getTitle());
        categoryUpdate.setDescription(category.getDescription());
        categoryUpdate.setUrl(category.getUrl());
        return repository.save(categoryUpdate);
    }

    public void delete(Long id) {
        repository.deleteById(id);
    }

    public Optional<Category> findById(Long id){
        return repository.findById(id);
    }
}
