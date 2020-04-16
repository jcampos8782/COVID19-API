package com.jsoncampos.seriesapi.services;

import java.io.IOException;

import com.jsoncampos.seriesapi.models.HeadlinesResponse;

public interface HeadlinesService {
	HeadlinesResponse getTopHeadlines(String query, String regionCode) throws IOException;
}
