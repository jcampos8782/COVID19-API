package com.jsoncampos.seriesapi.repositories;

import java.util.List;

import org.bson.types.ObjectId;
import org.springframework.data.mongodb.repository.MongoRepository;
import org.springframework.data.mongodb.repository.Query;

import com.jsoncampos.seriesapi.models.Region;

public interface RegionRepository extends MongoRepository<Region,String> {

	@Query(value="{parentId: null}", sort="{name: 1}")
	List<Region> findTopLevelRegions();

	@Query(sort="{name: 1}")
	List<Region> findRegionsByParentId(ObjectId objectId);
}
