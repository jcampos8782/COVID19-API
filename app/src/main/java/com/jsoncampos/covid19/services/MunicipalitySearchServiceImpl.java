package com.jsoncampos.covid19.services;

import static com.google.common.base.Preconditions.checkNotNull;

import java.util.List;

import org.bson.types.ObjectId;
import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsoncampos.covid19.models.Municipality;
import com.jsoncampos.covid19.repositories.MunicipalityRepository;

@Service
public class MunicipalitySearchServiceImpl implements MunicipalitySearchService {

	private MunicipalityRepository repository;
	private static final Logger log = LoggerFactory.getLogger(MunicipalitySearchServiceImpl.class);
	@Autowired
	public MunicipalitySearchServiceImpl(MunicipalityRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public List<Municipality> findMunicipalitiesForRegion(String regionId) {
		checkNotNull(regionId, "regionId cannot be null");
		// TODO: Fix mongodb leaky abstraction
		log.info(regionId);
		return repository.findByRegionId(new ObjectId(regionId));
	}
	
}
