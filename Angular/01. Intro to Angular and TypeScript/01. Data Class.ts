class Data {
	method: string;
	uri: string;
	version: string;
	message: string;
	response: string | undefined;
	fulfilled: boolean;

	constructor(method: string, uri: string, version: string, message: string) {
		this.method = method;
		this.uri = uri;
		this.version = version;
		this.message = message;
		this.response = undefined;
		this.fulfilled = false;
	}
}

// class Data {
// 	constructor(
// 		public method: string,
// 		public uri: string,
// 		public version: string,
// 		public message: string,
// 		public response: string | undefined = undefined,
// 		public fulfilled: boolean = false
// 	) {}
// }

// Short way of defining the access modifier in the constructor with default values
// instead of declaring them before that and giving them values in the body of the constructor

const myData: Data = new Data('GET', 'http://google.com', 'HTTP/1.1', '');
console.log(myData);
