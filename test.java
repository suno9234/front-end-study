import java.io.*;
class Main {
	public static void main(String[] args) throws Exception {
		BufferedReader br = new BufferedReader(new InputStreamReader(System.in));
        int lines = Integer.parseInt(br.readLine());
        int[][] area = new int[lines][lines];
        for(int i=0; i<lines; i++){
            String temp = br.readLine();
						for(int j = 0; j <lines;j++){
							System.out.print(temp.charAt(j));
							area[i][j] = temp.charAt(j);
						}
						
        }
				System.out.println(area);
	}
}