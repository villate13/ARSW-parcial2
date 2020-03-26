/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.coronavirus.controller;

import edu.eci.arsw.coronavirus.services.CoronavirusServices;
import java.io.IOException;
import java.util.List;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RestController;

/**
 *
 * @author jmvillatei
 */
@RestController
@RequestMapping(value = "/coronavirus")
public class CoronvirusController {
    
    @Autowired
    CoronavirusServices cServices;
    
    @RequestMapping(method = RequestMethod.GET)
    public ResponseEntity<?> getResult(){
       
        try {
            return new ResponseEntity<>(cServices.getResult(),
                    HttpStatus.ACCEPTED);
        } catch (Exception ex) {
            Logger.getLogger(CoronvirusController.class.getName()).log(Level.SEVERE, null, ex);
            return new ResponseEntity<>("Error, No es posible obtener la informacion", HttpStatus.NOT_FOUND);
        }
    }
    
    @RequestMapping(method = RequestMethod.GET, path = "/{countryName}")
    public ResponseEntity<?> getResultByCountry(@PathVariable("countryName") String countryName) {
        try {
            return new ResponseEntity<>(cServices.getResultByCountry(countryName),
                    HttpStatus.ACCEPTED);
        } catch (IOException ex) {
            return new ResponseEntity<>("Error, no se ha podido obtener la informacion del pais "+countryName, HttpStatus.NOT_FOUND);
        }
    }
}
