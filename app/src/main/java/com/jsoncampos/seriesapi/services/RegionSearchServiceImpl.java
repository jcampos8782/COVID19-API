package com.jsoncampos.seriesapi.services;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.jsoncampos.seriesapi.models.Region;
import com.jsoncampos.seriesapi.repositories.RegionRepository;

@Service
public class RegionSearchServiceImpl implements RegionSearchService {

	private RegionRepository repository;
	
	@Autowired
	public RegionSearchServiceImpl(RegionRepository repository) {
		this.repository = repository;
	}
	
	@Override
	public Region find(String regionId) {
		return repository.findById(regionId).orElse(null);
	}
	
	@Override
	public List<Region> findAll() {
		return repository.findTopLevelRegions();
	}

	@Override
	public List<Region> findSubRegions(String regionId) {
		return repository.findRegionsByParentId(new ObjectId(regionId));
	}
}
