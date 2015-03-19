var Slider = React.createClass({displayName: "Slider",
	getDefaultProps: function() {
		return {
			min: 0,
			max: 100,
			value: 0
		}
	},

	render: function() {
		return ( 
			React.createElement("div", {className: this.props.visible ? 'show slider' : 'slider'}, 
				React.createElement("label", null, this.props.name), 
				React.createElement("input", {name: this.props.name, 
					type: "range", 
					ref: "range", 
					value: this.props.value, 
					min: this.props.min, 
					max: this.props.max, 
					onChange: this.props.update})
			)
		);
	}
});

var Image = React.createClass({displayName: "Image",

	getInitialState: function() {
		return {
			selected: 'brightness',
			showNav: false,
			showOriginal: false,
			image: '',
			filters: {}
		}
	},

	updateFilter: function(e) {
		var filter = e.target.getAttribute('name');
		var currentFilters = this.state.filters;
		currentFilters[filter] = this.refs[filter].refs.range.getDOMNode().value;;
		this.setState({filters: currentFilters});
	},

	setSelected: function(a) {
		this.setState({
			selected: a.target.getAttribute('data-key'),
			showNav: false
		});
	},

	showNav: function() {
		console.log('showNav');
		this.setState({showNav: true});
	},

	showOriginal: function() {
		this.setState({showOriginal: true});
	},

	hideOriginal: function() {
		this.setState({showOriginal: false});
	},

	clearImage: function() {
		this.setState({filters:{}});
	},

	closeImage: function() {
		this.setState({image:''});
	},

	saveImage: function() {
		alert('This is simple web app and this functionality is still unavailable...');
	},

	getImage: function(e) {
		var files = e.target.files;
		if ( files && files.length > 0 ) {
			var file = files[0];
			var fileReader = new FileReader();
            fileReader.onload = function (event) {
                this.setState({image: event.target.result});
            }.bind(this);
            fileReader.readAsDataURL(file);
		}
	},

	render: function() {
		var filters = [
			{ name: 'blur', 		value: 0, 	max: 10, 	unit: 'px'}, // 0px to 100px
			{ name: 'brightness', 	value: 100, max: 200 },  //0% to 100%,
			{ name: 'contrast', 	value: 100, max: 200 }, // 0% to 100%,
			{ name: 'hue-rotate', 	value: 0, 	max: 360,	unit: 'deg'}, // 0% to 100%,
			{ name: 'grayscale', 	value: 0, 	max: 100 }, // 0% to 100%
			{ name: 'invert', 		value: 0, 	max: 100 }, // 0% to 100%
			{ name: 'saturate', 	value: 100, max: 500}, // 0% to 100%
			{ name: 'sepia', 		value: 0, 	max: 100} // 0 to 100%
		];

		var headerBtns = '';
		var image = '';
		var newImageBtn = '';

		//if alreade have image
		if ( this.state.image ) {

			var stateFilters = this.state.filters;

			var filterEl = filters.map( function(obj){
				var visible = this.state.selected === obj.name;
				var value = stateFilters && stateFilters[obj.name] ?  stateFilters[obj.name] : obj.value;
				return React.createElement(Slider, {ref: obj.name, visible: visible, name: obj.name, update: this.updateFilter, max: obj.max, value: value});
			}.bind( this ) );

			var nav = '';
			if ( this.state.showNav ) {
				var navList = filters.map( function(obj){
					var selected = obj.name == this.state.selected ? 'selected' : '';
					return React.createElement("li", {"data-key": obj.name, className: selected, onClick: this.setSelected}, obj.name); 
				}.bind(this));
				nav = React.createElement("ul", {className: "nav"}, navList);
			}

			var style = {};
			if ( stateFilters && !this.state.showOriginal ) {
				style = {'WebkitFilter': ''};
				var i = 0;
				for ( var  property in stateFilters ) {
					var unit = '%';
					if ( property === 'blur' ) {
						unit = 'px';
					} else if ( property === 'hue-rotate' ) {
						unit = 'deg';
					}
					style['WebkitFilter'] += property + '(' + stateFilters[property] + unit + ') ';
					i++;
				}
			}

			var headerBtns = (
				React.createElement("div", {className: "icons-menu"}, 
					React.createElement("button", {className: "btn icon-more-vert", 	onTouchEnd: this.showNav}), 
					React.createElement("button", {className: "btn icon-compare", 	onTouchStart: this.showOriginal, onTouchEnd: this.hideOriginal}), 
					React.createElement("button", {className: "btn icon-perm-media", onTouchEnd: this.clearImage}), 
					React.createElement("button", {className: "btn icon-save", 		onTouchEnd: this.saveImage}), 
					React.createElement("button", {className: "btn icon-close", 		onTouchEnd: this.closeImage})
				)
				);

			var image = React.createElement("img", {style: style, onClick: this.showNav, src: this.state.image})			
		} else {
			headerBtns = 'Header';
			newImageBtn = (
				React.createElement("div", {className: "new-image"}, 
					React.createElement("label", {htmlFor: "get-image"}, "get photo"), React.createElement("br", null), 
					React.createElement("label", {htmlFor: "get-image", className: "btn get-image icon-camera"}), 
					React.createElement("input", {type: "file", className: "hide", id: "get-image", onChange: this.getImage, accept: "image/*"})
				)
				);
		}
			

		return ( 
			React.createElement("div", {className: "container"}, 
				React.createElement("div", {className: "header"}, 
					headerBtns
				), 
				React.createElement("div", {className: "main"}, 
					nav, 
					React.createElement("div", {className: "image"}, 
						image, 
						newImageBtn
					)
				), 	
				React.createElement("div", {className: "footer"}, filterEl)
			)
		);
	}
});


React.initializeTouchEvents(true);
React.render( React.createElement(Image, null),
	document.getElementById('app')
);