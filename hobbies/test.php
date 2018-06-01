<?php
class ATM{

	protected static $cashArr = [
		'1000'=>2,
		'500'=>4,
		'100'=>3
	];

	protected static $withdrawVal = [
		'1000'=>0,
		'500'=>0,
		'100'=>0
	];

	public function denominate($amount){
		$origAmount = $amount;
		if($amount > self::totalInv()){
			// $('p').text('Insufficient Inventory');
			echo 'Insufficient Inventory';
		}else{
			foreach (static::$cashArr as $key => $value) {
				$amount = self::deciminate($amount, $key);				
			}
			if($amount > 0){
				echo "Insufficient Denomination";
			}else{
				print_r(static::$withdrawVal);
			}
		}
	}
	public function deciminate($current_amount, $value){
		$denomination = intval($current_amount/$value);
		$mod = intval($current_amount%$value);
		if($denomination >= 1){
			if($denomination <= static::$cashArr[$value]){
				static::$withdrawVal[$value] += $denomination;
				static::$cashArr[$value] -= $denomination;
				$current_amount -= $value*$denomination;
				return $current_amount;
			}else{
				return $current_amount;
			}
		}else{
			return $current_amount;
		}
	}
	public function totalInv(){
		$total = 0;
		foreach (static::$cashArr as $value => $quantity) {
			$total += $value * $quantity;
			
		}
		return $total;
	}
	public function InveDesc(){
		// cashArr.sort();
	}

} 
	ATM::denominate($_GET['amount']);
?>