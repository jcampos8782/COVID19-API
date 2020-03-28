package com.jsoncampos.seriesapi.services;

import java.util.List;

import com.jsoncampos.seriesapi.models.Region;

public interface RegionSearchService {
	public Region find(String regionId);
	public List<Region> findAll();
	public List<Region> findSubRegions(String regionId);
}
