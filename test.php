<!DOCTYPE html>
<html lang="en">
<head>
	<meta charset="UTF-8">
	<title>Document</title>
	<script src="js/jquery-1.10.2.js"></script>
</head>
<body>
	<?php


	 ?>
</body>
</html>
<script>
	$(document).ready(function(){
		function solution(A) {
		    var n = A.length;
		    var L = new Array(n + 1);
		    L[0] = -1;
		    var i;
		    for (i = 0; i < n; i++) {
		        L[i + 1] = A[i];
		    }
		    var count = 0;
		    var pos = Math.floor((n + 1) / 2);
		    candidate = L[pos];
		    for (i = 1; i <= n; i++) {
		        if (L[i] == candidate)
		            count = count + 1;
		    }
		    
		    if (count > pos)
		        return candidate;
		    return (-1);
		}

		n=[1, 2, 2, 2, 2, 3] ;
		console.log(solution(n))
	})
</script>