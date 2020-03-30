package com.jsoncampos.seriesapi.controllers.responses;

import java.util.List;

import com.jsoncampos.seriesapi.dto.DataDto;
import com.jsoncampos.seriesapi.dto.SeriesDto;

public class GetSeriesNearResponse extends GetSeriesResponse {
	public GetSeriesNearResponse(SeriesDto series, List<DataDto> data) {
		super(series, data);
	}
}
