package com.projet.backreact.service;

import com.projet.backreact.model.Employe;

import java.util.List;

public interface EmployeService {
    Employe creer(Employe employe);
    List<Employe> afficher();
    Employe modifier(Integer numero, Employe employe);
    String supprimer(Integer numero);
    Integer afficherTotalSalaire();
    Integer afficherMinSalaire();
    Integer afficherMaxSalaire();
}
