package com.dh.canchas365.controller;

import com.dh.canchas365.exceptions.CustomFieldException;
import com.dh.canchas365.model.Category;
import com.dh.canchas365.service.CategoryService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.validation.BindingResult;
import org.springframework.web.bind.annotation.*;

import java.util.List;
import java.util.Optional;

@RestController
@RequestMapping("/category")
public class CategoryController extends CustomFieldException {

    @Autowired
    private CategoryService service;

    @PreAuthorize("hasRole('ADMIN')")
    @PostMapping
    public ResponseEntity<?> create(@RequestBody Category category, BindingResult bindingResult){
        try{
            if(bindingResult.hasErrors()) {
                return validate(bindingResult);
            }
            return ResponseEntity.status(HttpStatus.CREATED).body(service.create(category));
        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @GetMapping
    public List<Category> getAll(){
        return service.getAll();
    }


    @GetMapping("/{id}")
    public ResponseEntity<?> getById(@PathVariable("id") Long id){
        try {
            Optional<Category> optional = service.findById(id);
            if(optional.isPresent()){
                return ResponseEntity.ok(optional.get());
            }else {
                return customResponseError("El id ingresado no existe", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @PutMapping
    public ResponseEntity<?> update(@RequestBody Category category, BindingResult bindingResult){
        try {
            if(bindingResult.hasErrors()) {
                return validate(bindingResult);
            }

            return ResponseEntity.status(HttpStatus.OK).body(service.update(category));
        }
        catch (Exception ex) {
            return customResponseError(ex.getMessage(), HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }

    @PreAuthorize("hasRole('ADMIN')")
    @DeleteMapping("/{id}")
    public ResponseEntity<?> delete(@PathVariable Long id) {
        try {
            Optional<Category> optional = service.findById(id);
            if(optional.isPresent()) {
                service.delete(id);
                return ResponseEntity.status(HttpStatus.OK).body("Categoria Eliminada exitosamente");
            } else {
                return customResponseError("El id ingresado no existe", HttpStatus.NOT_FOUND);
            }
        } catch (Exception ex) {
            return customResponseError(ex.getMessage(),HttpStatus.INTERNAL_SERVER_ERROR);
        }
    }
}
