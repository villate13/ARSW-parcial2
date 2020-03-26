/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.coronavirus.persistence;

import java.io.IOException;
import java.net.MalformedURLException;
import java.net.ProtocolException;

/**
 *
 * @author jmvillatei
 */
public interface CoronavirusPersistence {
    
    /**
     * 
     * @return
     * @throws MalformedURLException
     * @throws ProtocolException
     * @throws IOException 
     */
    public String getResult() throws MalformedURLException, ProtocolException, IOException;
    
    /**
     * 
     * @param country
     * @return
     * @throws MalformedURLException
     * @throws ProtocolException
     * @throws IOException 
     */
    public String getResultByCountry(String country) throws MalformedURLException, ProtocolException, IOException;
}
