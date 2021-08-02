package com.modelsComparator.API.domain;

import org.springframework.data.annotation.Id;
import org.springframework.data.mongodb.core.mapping.DBRef;
import org.springframework.data.mongodb.core.mapping.Document;

@Document(collection = "Models")
public class Model {

	@Id
    private String id;
    private String idUser;
    private String modelName;
    @DBRef
    private DataModel modelData;
    private String modelDate;
    
	public Model() {
	}

	public Model(String idUser, String modelName, DataModel modelData, String modelDate) {
		super();
		this.idUser = idUser;
		this.modelName = modelName;
		this.modelData = modelData;
		this.modelDate = modelDate;
	}

	public String getId() {
		return id;
	}

	public void setId(String id) {
		this.id = id;
	}

	public String getIdUser() {
		return idUser;
	}

	public void setIdUser(String idUser) {
		this.idUser = idUser;
	}

	public String getModelName() {
		return modelName;
	}

	public void setModelName(String modelName) {
		this.modelName = modelName;
	}

	public DataModel getModelData() {
		return modelData;
	}

	public void setModelData(DataModel modelData) {
		this.modelData = modelData;
	}
	
	public String getModelDate() {
		return modelDate;
	}

	public void setModelDate(String modelDate) {
		this.modelDate = modelDate;
	}

//	public String getIdModelData() {
//		return idModelData;
//	}
//
//	public void setIdModelData(String idModelData) {
//		this.idModelData = idModelData;
//	}
    
}
