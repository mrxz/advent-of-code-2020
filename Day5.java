import java.util.BitSet;
import java.util.Set;
import java.nio.file.*;
import java.util.stream.Collectors;

public class Day5 {

	public static void main(String[] args) throws Exception {
		System.out.println("Hello world");
		
		Path path = FileSystems.getDefault().getPath("day5_input.txt");
		Set<Integer> seatIds = Files.readAllLines(path).stream()
			.map(position -> computeSeatId(
				fromBitString(position.substring(0, 7), 'B'),
				fromBitString(position.substring(7), 'R')))
			.collect(Collectors.toSet());
		
		int maxSeatId = seatIds.stream().max(Integer::compare).orElse(-1);
		System.out.println(maxSeatId);
		
		// We can skip rows 0 and 127, so 1-126
		for(int row = 1; row < 101; row++) {
			for(int col = 0; col < 7; col++) {
				int seatId = computeSeatId(row, col);
				if(!seatIds.contains(seatId)) {
					System.out.println("Found seat: " + seatId);
				}
			}
		}
	}

	private static int fromBitString(String input, char one) {
		int result = 0;
		for(int i = 0; i < input.length(); i++) {
			result <<= 1;
			if(input.charAt(i) == one) {
				result |= 1;
			}
		}
		return result;
	}
	
	private static int computeSeatId(int row, int col) {
		return row * 8 + col;
	}
	
}
