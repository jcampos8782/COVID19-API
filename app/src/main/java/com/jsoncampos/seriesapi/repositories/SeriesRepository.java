package com.jsoncampos.seriesapi.repositories;

import java.util.List;

import org.springframework.data.mongodb.repository.MongoRepository;

import com.jsoncampos.seriesapi.models.Series;

public interface SeriesRepository extends MongoRepository<Series,String> {
	public List<Series> findAll();
}
