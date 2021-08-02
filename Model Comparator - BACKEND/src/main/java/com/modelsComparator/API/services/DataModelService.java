package com.modelsComparator.API.services;

import java.io.IOException;
import java.util.Optional;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.modelsComparator.API.domain.DataModel;
import com.modelsComparator.API.parser.ParserXML;
import com.modelsComparator.API.repositories.DataModelRepository;

@Service
public class DataModelService {
	
	@Autowired
	private DataModelRepository dataModelRepository;
	
	private ParserXML parserData = new ParserXML();
	
	public DataModel save (String data, String name) throws IOException {
		DataModel dataModel = parserData.parser(data, name);
		dataModelRepository.save(dataModel);
		return dataModel;
	}
	
	public void delete(String id) {
		Optional<DataModel> data = dataModelRepository.findById(id);
		dataModelRepository.delete(data.get());
	}

}
