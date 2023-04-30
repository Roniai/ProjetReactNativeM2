package com.projet.backreact.repository;

import com.projet.backreact.model.Employe;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

public interface EmployeRepository extends JpaRepository<Employe, Integer> {

    @Query("SELECT sum(e.nbjours*e.tauxjournalier) FROM Employe e")
    Integer totalSalaire();

    @Query("SELECT min(e.nbjours*e.tauxjournalier) FROM Employe e")
    Integer minSalaire();

    @Query("SELECT max(e.nbjours*e.tauxjournalier) FROM Employe e")
    Integer maxSalaire();

}
