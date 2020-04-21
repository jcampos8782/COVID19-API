package com.jsoncampos.seriesapi.services;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsoncampos.seriesapi.models.Demographics;
import com.jsoncampos.seriesapi.repositories.DemographicsRepository;

@Service
public class DemographicsServiceImpl implements DemographicsService {

	private DemographicsRepository repository;
	
	@Autowired
	public DemographicsServiceImpl(DemographicsRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Demographics getDemographicsForRegion(String regionId) {
		return repository.findOneByRegionId(new ObjectId(regionId));
	}

}
