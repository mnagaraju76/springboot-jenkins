

<script src="https://code.jquery.com/jquery-3.6.0.min.js" crossorigin="anonymous"></script>
	<script src="https://code.jquery.com/ui/1.12.1/jquery-ui.min.js" crossorigin="anonymous"></script>
	
	<script type="text/javascript">
		$(document).ready(function() {
			$("#username").on("input", function(e) {
				$('#msg').hide();
				if ($('#username').val() == null || $('#username').val() == "") {
					$('#msg').show();
					$("#msg").html("Username is a required field.").css("color", "red");
				} else {
					$.ajax({
						type: 'post',
						url: "/user",
						data: JSON.stringify({userName: $('#username').val()}),
						contentType: 'application/json; charset=utf-8',
						//dataType: 'html',
						cache: false,
						beforeSend: function (f) {
							$('#msg').show();
							$('#msg').html('Checking...');
						},
						statusCode: {
						    500: function(xhr) {
						    	$('#msg').show();
						    	$("#msg").html("Username available").css("color", "green");
						    }
						},
						success: function(msg) {
							$('#msg').show();
							if(msg !== null || msg !== "") {
								$("#msg").html("Username already taken").css("color", "red");
							} else {
								$("#msg").html("Username available").css("color", "green");
							}
						},
						error: function(jqXHR, textStatus, errorThrown) {
							$('#msg').show();
							$("#msg").html(textStatus + " " + errorThrown).css("color", "red");
						}
					});
				}
			});
		});
