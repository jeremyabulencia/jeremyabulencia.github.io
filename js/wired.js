$(document).ready(function(){
	callbacks = $.Callbacks();

	var rootRef = new Firebase("https://wired.firebaseio.com/");


	var username = " ";

	var users = {};

	rootRef.on('child_added',function(snapshot){
		users = snapshot.val()
	})

	adjustTextBox = function(){
		var textBoxWidth = $('#chat-form').outerWidth()-$('#chat-button').outerWidth()-10;
		$('#chat-box').css({'width':textBoxWidth+'px'});
	}

	addChat = function(username, message){
		var layout = '<li><span id="usrLbl">[username]</span>: <span id="msgFld">[message]</span></li>';
		var newInput = layout;
		
		newInput = newInput.replace('[username]',username);
		newInput = newInput.replace('[message]',message);
		newInput = newInput.replace('<script>','');

		$('#chat-messages').append(newInput);

	}

	adjustScroll = function(){
		$('#chat-log').scrollTop($('#chat-log ul').height());
	}

	disconnect = function(){
		rootRef.child('users/'+username).set({
			created_at:$.now(),
			online:0,
		})
	}

	function isUnique(txt){
		var isAvailable = true;
		$.each(users,function(index,value){
			if(index == txt && value.online == 1){
				isAvailable = false;
			}
		})
		return isAvailable;
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

	$('#login-textbox').keypress(function(e){
		if(e.which == 13){
			if(isUnique($(this).val())){
				rootRef.child('users/'+$(this).val()).set({
					created_at:$.now(),
					online:1,
				})
				thisUsername = $(this).val();
				rootRef.child('users').child($(this).val()).on('value',function(snapshot){
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
		}
	})
	
	$(window).unload(function(){
		callbacks.fire(disconnect())
	})

})