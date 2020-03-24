package com.jsoncampos.covid19.services;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsoncampos.covid19.models.Region;
import com.jsoncampos.covid19.repositories.RegionRepository;

@Service
public class RegionSearchServiceImpl implements RegionSearchService {

	private RegionRepository repository;
	
	
	@Autowired
	public RegionSearchServiceImpl(RegionRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public List<Region> findAll() {
		return repository.findAll();
	}

}