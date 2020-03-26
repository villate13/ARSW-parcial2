/*
 * To change this license header, choose License Headers in Project Properties.
 * To change this template file, choose Tools | Templates
 * and open the template in the editor.
 */
package edu.eci.arsw.coronavirus.persistence.impl;

import com.fasterxml.jackson.databind.JsonNode;
import com.mashape.unirest.http.HttpResponse;
import com.mashape.unirest.http.Unirest;
import com.mashape.unirest.http.exceptions.UnirestException;
import edu.eci.arsw.coronavirus.persistence.CoronavirusPersistence;
import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.MalformedURLException;
import java.net.ProtocolException;
import java.net.URL;
import java.util.logging.Level;
import java.util.logging.Logger;
import org.springframework.stereotype.Service;


/**
 *
 * @author jmvillatei
 */
@Service
public class InMemoryCoronavirusPersistence implements CoronavirusPersistence{

    private String keyCovid = "1f289489c2msh5ac2675eba7beacp1c2f18jsnd14f28834b31";
    private String hostCovid = "covid-19-coronavirus-statistics.p.rapidapi.com";
    
    
    @Override
    public String getResult() throws MalformedURLException, ProtocolException, IOException {
        
        try {
            HttpResponse<String> response = Unirest.get("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats")
                    .header("x-rapidapi-host", hostCovid)
                    .header("x-rapidapi-key", keyCovid)
                    .asString();
            System.out.println("Status: "+response.getStatusText());
            System.out.println("Body: "+response.getBody());
            return response.getBody();
            //String url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats";
            //return getHttpRequest(url);
        } catch (UnirestException ex) {
            Logger.getLogger(InMemoryCoronavirusPersistence.class.getName()).log(Level.SEVERE, null, ex);
            return ">>>error";
        }
        
    }

    @Override
    public String getResultByCountry(String country) throws MalformedURLException, ProtocolException, IOException {
        try {
            HttpResponse<String> response = Unirest.get("https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats?country="+country)
                    .header("x-rapidapi-host", hostCovid)
                    .header("x-rapidapi-key", keyCovid)
                    .asString();
            System.out.println("Status: "+response.getStatusText());
            System.out.println("Body: "+response.getBody());
            return response.getBody();
            //String url = "https://covid-19-coronavirus-statistics.p.rapidapi.com/v1/stats";
            //return getHttpRequest(url);
        } catch (UnirestException ex) {
            Logger.getLogger(InMemoryCoronavirusPersistence.class.getName()).log(Level.SEVERE, null, ex);
            return ">>>error, Country";
        }
    }

    
}
