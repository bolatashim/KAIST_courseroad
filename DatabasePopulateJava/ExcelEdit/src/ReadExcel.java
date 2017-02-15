//the following reads the excel file 
import java.io.File;
import java.io.IOException;
import java.util.Locale;

import jxl.CellView;
import jxl.Workbook;
import jxl.WorkbookSettings;
import jxl.format.UnderlineStyle;
import jxl.write.Formula;
import jxl.write.Label;
import jxl.write.Number;
import jxl.write.WritableCellFormat;
import jxl.write.WritableFont;
import jxl.write.WritableSheet;
import jxl.write.WritableWorkbook;
import jxl.write.WriteException;
import jxl.write.biff.RowsExceededException;
import jxl.Cell;
import jxl.CellType;
import jxl.Sheet;
import jxl.read.biff.BiffException;

import java.io.BufferedReader;
import java.io.DataOutputStream;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URL;

import javax.net.ssl.HttpsURLConnection;

import org.json.simple.JSONObject;



public class ReadExcel {
    private String inputFile;

    public void setInputFile(String inputFile) {
            this.inputFile = inputFile;
    }

    public void read(String year, String semester) throws IOException  {
            File inputWorkbook = new File(inputFile);
            Workbook w;
            try {
		            w = Workbook.getWorkbook(inputWorkbook);
		            // Get the first sheet
		            Sheet sheet = w.getSheet(0);
		            int rows = sheet.getRows();
		            int cols = sheet.getColumns();
		        	String temp = sheet.getCell(3,2).getContents(); 
		        	System.out.println("");
		
		        	for (int i = 3; i < rows; i++){
		        		if(sheet.getCell(6,i).getContents() != temp){
		        			
		        			JSONObject course = new JSONObject();
		        			course.put("code", sheet.getCell(3,i).getContents());
		        			course.put("title", sheet.getCell(6,i).getContents());
		        			course.put("type", sheet.getCell(2,i).getContents());
		        			course.put("llc", sheet.getCell(9,i).getContents());
		        			course.put("depcode", sheet.getCell(cols - 2,i).getContents());
		        			course.put("year", year);
		        			course.put("semester", semester);
		                    try {
		                    	ReadExcel.sendPost(course);
		                    	} catch (Exception e) {
		                            e.printStackTrace();
		                    	} 
		                	temp = sheet.getCell(6,i).getContents();
		                	System.out.println("");
		                	System.out.println("");
		        		}
		        		
		        	}
            	} catch (BiffException e) {
                    e.printStackTrace();
            	}
    }

    public static void main(String[] args) throws Exception {
            for (int i = 2010; i < 2018; i++) {
            	
            	if(i == 2017) {
            		ReadExcel test2 = new ReadExcel();
            		String fileName2 = "./data/" + i + "_" + "Spring.xls";
            		test2.setInputFile(fileName2);
            		test2.read(i+"", "Spring");
            	}else{
            		ReadExcel test1 = new ReadExcel();
            		String fileName1 = "./data/" + i + "_" + "Fall.xls";
            		test1.setInputFile(fileName1);
            		test1.read(i+"", "Fall");
            		
            		ReadExcel test2 = new ReadExcel();
            		String fileName2 = "./data/" + i + "_" + "Spring.xls";
            		test2.setInputFile(fileName2);
            		test2.read(i+"", "Spring");
            	}
            }            
    }
	
    private static void sendPost(JSONObject course) throws Exception {

        String url = "http://localhost:3000/courses/add";
        URL obj = new URL(url);
        HttpURLConnection con = (HttpURLConnection) obj.openConnection();

        //add request header
        con.setRequestMethod("POST");
        con.setRequestProperty("Content-Type", "application/json");

        // Send post request
        con.setDoOutput(true);
        DataOutputStream wr = new DataOutputStream(con.getOutputStream());
        wr.writeBytes(course.toString());
        wr.flush();
        wr.close();

        int responseCode = con.getResponseCode();
        System.out.println("\nSending 'POST' request to URL : " + url);
        System.out.println("Post body : " + course);
        System.out.println("Response Code : " + responseCode);

        BufferedReader in = new BufferedReader(
                new InputStreamReader(con.getInputStream()));
        String inputLine;
        StringBuffer response = new StringBuffer();

        while ((inputLine = in.readLine()) != null) {
            response.append(inputLine);
        }
        in.close();
        //print result
        System.out.println(response.toString());
    } 
}

