OV.ArrayBufferToUtf8String = function (buffer)
{
	let decoder = new TextDecoder ('utf-8');
	return decoder.decode (buffer);
};

OV.ArrayBufferToAsciiString = function (buffer)
{
	let text = '';
	let bufferView = new Uint8Array (buffer);
	for (let i = 0; i < bufferView.byteLength; i++) {
		text += String.fromCharCode (bufferView[i]);
	}
	return text;
};

OV.AsciiStringToArrayBuffer = function (str)
{
	let buffer = new ArrayBuffer (str.length);
	let bufferView = new Uint8Array (buffer);
	for (let i = 0; i < str.length; i++) {
		bufferView[i] = str.charCodeAt (i);
	}
	return buffer;
};

OV.Base64DataURIToArrayBuffer = function (uri)
{
	let dataPrefix = 'data:';
	if (!uri.startsWith (dataPrefix)) {
		return null;
	}

	let mimeSeparator = uri.indexOf (';');
	if (mimeSeparator === -1) {
		return null;
	}

	let bufferSeparator = uri.indexOf (',');
	if (bufferSeparator === -1) {
		return null;
	}

	let mimeType = uri.substr (dataPrefix.length, mimeSeparator - 5);
	let base64String = atob (uri.substr (bufferSeparator + 1));
	let buffer = new ArrayBuffer (base64String.length);
	let bufferView = new Uint8Array (buffer);
	for (let i = 0; i < base64String.length; i++) {
		bufferView[i] = base64String.charCodeAt (i);
	}

	return {
		mimeType : mimeType,
		buffer : buffer
	};
};
