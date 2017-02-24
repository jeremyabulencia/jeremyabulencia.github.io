$(document).ready(function(){
	callbacks = $.Callbacks();

	var rootRef = new Firebase("https://wired.firebaseio.com/");
	var rootRef2 = new Firebase("https://wired.firebaseio.com/");
	
	var userRef = rootRef.child('users');
	var messageRef = rootRef2.child('messages');

	var username = " ";
	var users = {};

	userRef.on('child_added',function(snapshot){
		users = snapshot.val()
	})

	userRef.on('child_changed',function(snapshot){
		userRef.on('value',function(snapshot2){
			users = snapshot2.val();
		})
	})

	messageRef.on('child_added',function(snapshot){
		var layout = '<li><span id="usrLbl">[username]</span>: <span id="msgFld">[message]</span></li>';
		var newInput = layout;

		newInput = newInput.replace('[username]',snapshot.val().author);
		newInput = newInput.replace('[message]',snapshot.val().content);
		newInput = newInput.replace('<script>','');


		$('#chat-messages').append(newInput);
	})

	adjustTextBox = function(){
		var textBoxWidth = $('#chat-form').outerWidth()-$('#chat-button').outerWidth()-10;
		$('#chat-box').css({'width':textBoxWidth+'px'});
	}

	addChat = function(username, message){
		messageRef.push({
			content:message,
			author:username
		})

	}

	adjustScroll = function(){
		$('#chat-log').scrollTop($('#chat-log ul').height());
	}

	disconnect = function(){
		userRef.child('users/'+username).set({
			created_at:$.now(),
			online:0,
		})
	}

	callbacks.fire(adjustTextBox());
	$(window).resize(function(){
		callbacks.fire(adjustTextBox());
	})

	$('#chat-button').on('click',function(){
		thisMessage = $('#chat-box').val().toString();
		thisUser = username;

		callbacks.fire(addChat(thisUser, thisMessage));
	})

	$('#chat-box').keypress(function(e){
		if(e.which == 13){
			if($(this).val() != ''){
				$('#chat-button').trigger('click');
				$(this).val('');
				callbacks.fire(adjustScroll())
			}else{
				return false;
			}
		}
	})

	// ======================================= LOGIN MODULE =========================================

	function isUnique(txt){
		var isAvailable = true;
		$.each(users,function(index,value){
			if(index == txt && value.online == 1){
				isAvailable = false;
			}
		})
		username = txt;
		return isAvailable;
	}

	$('#login-textbox').keypress(function(e){
		if(e.which == 13){
			if($(this).val() != ''){
				if(isUnique($(this).val())){
					userRef.child(username).set({
						created_at:$.now(),
						online:1,
					})
					thisUsername = $(this).val();
					userRef.child(username).on('value',function(snapshot){
						if(snapshot.val() != null){
							username = thisUsername;
							$('#login-container').hide();
						}else{
							$('#login-textbox').val('');
							alert('Please try again.');
						}
					})
				}else{
					alert('Username already in use. Please try again.');
					$(this).val('');

				}
			}else{
				alert('Please enter a username');
			}
		}
	})
	
	$(window).unload(function(){
		callbacks.fire(disconnect())
	})

})