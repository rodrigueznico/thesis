package com.modelsComparator.API.parser;

import java.io.ByteArrayInputStream;
import java.io.IOException;
import java.io.InputStream;
import java.nio.charset.StandardCharsets;
import java.nio.file.Files;
import java.nio.file.Path;
import java.nio.file.Paths;
import java.nio.file.StandardCopyOption;

public class FileXML {
	
	private static final Path path = Paths.get("temp-files");
	
	public String createFile (String data, String name) throws IOException {
		Files.createDirectories(path);
		InputStream arch = new ByteArrayInputStream(data.getBytes(StandardCharsets.UTF_8));
		Files.copy(arch, path.resolve(name), StandardCopyOption.REPLACE_EXISTING);
		return path + "/" + name;
	}
	
	public void deleteFiles(String fileName) throws IOException {
		Files.delete(path.resolve(fileName));
	}

}
