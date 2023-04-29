package com.projet.backreact.model;

import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

import javax.persistence.*;

@Entity
@Table(name = "Employe") //Nom de la table à mapper
@Getter //Lombok génère auto getter
@Setter //Lombok génère auto setter
@NoArgsConstructor //Lombok génère auto constructor sans arguments
public class Employe {
    //Id : Auto Incrémenter
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Integer id;

    private Integer numero;

    @Column(length = 50)
    private String nom;

    private Integer nbjours;

    private Integer tauxjournalier;
}
