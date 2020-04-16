package com.jsoncampos.seriesapi.services;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Service;

import com.google.gson.Gson;
import com.jsoncampos.seriesapi.models.HeadlinesResponse;

@Service
public class HeadlinesServiceImpl implements HeadlinesService {

	@Value("${newsapi.baseUrl}")
	private String baseUrl;
	
	@Value("${newsapi.apikey}")
	private String apiKey;
	
	@Override
	public HeadlinesResponse getTopHeadlines(String query, String regionCode) throws IOException {
		String urlString = String.format("%s/top-headlines?apiKey=%s&q=%s&country=%s", this.baseUrl, this.apiKey, query, regionCode);
		URL url = new URL(urlString);
		HttpURLConnection con = (HttpURLConnection) url.openConnection();
		con.setRequestProperty("Accept", "application/json");

	    StringBuilder responseBuilder = new StringBuilder();
		try(BufferedReader br = new BufferedReader(
		  new InputStreamReader(con.getInputStream(), "utf-8"))) {
		    String responseLine = null;
		    while ((responseLine = br.readLine()) != null) {
		    	responseBuilder.append(responseLine.trim());
		    }
		}

		return new Gson().fromJson(responseBuilder.toString(), HeadlinesResponse.class);
	}
}
