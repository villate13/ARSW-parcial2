/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.coronavirus.services;

import edu.eci.arsw.coronavirus.persistence.CoronavirusPersistence;
import java.io.IOException;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

/**
 *
 * @author jmvillatei
 */
@Service
public class CoronavirusServicesStub implements CoronavirusServices{
    
    @Autowired
    CoronavirusPersistence cPersistence;

    @Override
    public String getResult() throws MalformedURLException, ProtocolException, IOException {
        return cPersistence.getResult();
    }

    @Override
    public String getResultByCountry(String country) throws MalformedURLException, ProtocolException, IOException {
        return cPersistence.getResultByCountry(country);
    }
    
}
