
public class TestRecursion {

	public static void main(String[] args) {
		
		System.out.println(DoubleRecursion(1,100));
	}
	
	static long DoubleRecursion (long m, long n) {
		if (m == 0){
			return n + 1;
		}else if (m > 0 && n == 0){
			return DoubleRecursion(m - 1, 1);
		}else {
			return DoubleRecursion(m - 1, DoubleRecursion(m, n-1));
		}
	}
}
