package com.projet.backreact.service;

import com.projet.backreact.model.Employe;
import com.projet.backreact.repository.EmployeRepository;
import lombok.AllArgsConstructor;
import org.springframework.stereotype.Service;

import java.util.List;

@Service
@AllArgsConstructor
public class EmployeServiceImpl implements EmployeService{

    private final EmployeRepository employeRepository;

    @Override
    public Employe creer(Employe employe) {
        return employeRepository.save(employe); //persister
    }

    @Override
    public List<Employe> afficher() {
        return employeRepository.findAll();
    }

    @Override
    public Employe modifier(Integer numero, Employe employe) {
        return employeRepository.findById(numero)
                .map(e -> {
                    e.setNumero(employe.getNumero());
                    e.setNom(employe.getNom());
                    e.setNbjours(employe.getNbjours());
                    e.setTauxjournalier(employe.getTauxjournalier());
                   return employeRepository.save(e);
                }).orElseThrow(() -> new RuntimeException("Employe non trouvé !"));
    }

    @Override
    public String supprimer(Integer numero) {
        employeRepository.deleteById(numero);
        return "Employe supprimé !";
    }
}
