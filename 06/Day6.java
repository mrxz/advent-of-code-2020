import java.util.BitSet;
import java.util.Set;
import java.util.HashSet;
import java.util.Arrays;
import java.nio.file.*;
import java.util.stream.Collectors;

public class Day6 {
	public static void main(String[] args) throws Exception {
		System.out.println("Hello world");
		
		long sum = 0;
		Set<Character> group = null; 
		Path path = FileSystems.getDefault().getPath("day6_input.txt");
		for(String line : Files.readAllLines(path)) {
			if(line.isEmpty()) {
				sum += group.size();
				//group = new HashSet<>(); // Part 1
				group = null;
				continue;
			}
			
			// Part 1
			//for(char c : line.toCharArray())
			//	group.add(c);
			
			// Part 2
			Set<Character> person = new HashSet<>();
			for(char c : line.toCharArray()) {
				person.add(c);
			}
			if(group == null) {
				group = person;
			} else {
				group.retainAll(person);
			}
		}
		sum += group.size();
		
		System.out.println(sum);
	}
}
