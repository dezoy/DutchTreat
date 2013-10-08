$(document).ready(function () {
	var data = [];
	$('#step_1').find('#people').focus();

	$('#people').on('keyup', function (evt) {
		var key = evt.keyCode || evt.which,
			name = $(this).val();
		if (key === 13) {
			data.push({
				name: name,
				sum: [],
				div: 0,
				amount:0,
				sums: []
			});
			$('#adding-list').find('ul').html('');
			$.each(data, function (i, v) {
				$('#adding-list').find('ul').append('<li data-uid="' + i + '">' + this.name + '</li>');
			});
			if (data.length > 1) {
				$('#next_step_2').removeAttr('disabled');
			} else {
				$('#next_step_2').attr('disabled', 'disabled');
			}
			$(this).val('');
		}
	});

	$('#prev_step_1').on('click', function () {
		$('#step_1').show();
		$('#step_2').hide();
		$('#people').focus();
	});
	$('#next_step_2').on('click', function () {
		$('#amount-list').find('ul').html('');
		$('#step_1').hide();
		$('#step_2').show();
		$.each(data, function () {
			$('#amount-list').find('ul').append('<li><label>' + this.name + ': 0</label></li>');
		});
		$('#sum').on('keyup', function (evt) {
			var key = evt.keyCode || evt.which,
				sum = parseInt($(this).val()),
				str = '',
				len = data.length - 1;
			if (key === 13) {
				$('#amount-list').find('li').each(function (i, v) {
					if ($(this).hasClass('active')) {
						data[i].sum.push(sum);
						amount = (data[i].amount + sum).toFixed(2);
						data[i].div = (amount / (len + 1)).toFixed(2);
					}
					var amount = 0;
					$.each(data[i].sum, function () {
						amount += this;
					});
					str += '<li>' + data[i].name + ': ' + amount + '</li>';
					if (i == len) {
						$('#amount-list').find('ul').html('').append(str);
					}
				});
				$(this).val('');
			}
		});
	});
	
	$('#prev_step_2').on('click', function(){
		$('#step_2').show();
		$('#step_finish').hide();
	});
	
	$('#next_step_finish').on('click', function () {
		var len = data.length - 1,
			str = '';
		$.each(data, function (k, vs) {
			$.each(data, function (i, v) {
				if (k != i) {
					if (data[k].div > data[i].div) {
						data[i].sums[k] = (data[k].div - data[i].div).toFixed(2);
						str += '<li>'+data[i].name+' &rarr; '+data[k].name+': '+data[i].sums[k]+'</li>';
					}
				}
			});
			if (k == len) {
				$('#step_2').hide();
				$('#step_finish').show();
				$('#finish-list').find('ul').html('').append(str);
			}
		});
	});

	$('#amount-list').on('click', 'li', function () {
		if (!$(this).hasClass('active')) {
			$(this).addClass('active');
		} else {
			$(this).removeClass('active');
		}
		$('#sum').focus();
	});
});