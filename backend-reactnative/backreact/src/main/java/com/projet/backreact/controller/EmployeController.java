package com.projet.backreact.controller;

import com.projet.backreact.model.Employe;
import com.projet.backreact.service.EmployeService;
import lombok.AllArgsConstructor;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/employe")
@AllArgsConstructor
public class EmployeController {
    private final EmployeService employeService;

    //@RequestBody : Pour qu'il est un body par défaut sur la requête
    @PostMapping("/create")
    public Employe create(@RequestBody Employe employe){
        return employeService.creer(employe);
    }

    @GetMapping("/")
    public List<Employe> read(){
        return employeService.afficher();
    }

    @PutMapping("/update/{numero}")
    public Employe update(@PathVariable Integer numero, @RequestBody Employe employe){
        return employeService.modifier(numero, employe);
    }

    @DeleteMapping("/delete/{numero}")
    public String delete(@PathVariable Integer numero){
        return employeService.supprimer(numero);
    }
}
