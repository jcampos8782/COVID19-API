package com.jsoncampos.seriesapi.services;

import org.bson.types.ObjectId;
import org.springframework.stereotype.Service;

import com.jsoncampos.seriesapi.models.Facts;
import com.jsoncampos.seriesapi.repositories.FactsRepository;

@Service
public class FactsServiceImpl implements FactsService {

	private FactsRepository repository;
	
	public FactsServiceImpl(FactsRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Facts getFactsForRegion(String regionId) {
		return repository.getOneByRegionId(new ObjectId(regionId));
	}
}
