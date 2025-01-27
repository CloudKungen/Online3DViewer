var assert = require ('assert');
var testFiles = require ('../utils/testfiles.js');

describe ('IO Test', function () {
	it ('Binary Reader', function () {
        let buffer = testFiles.GetArrayBufferFileContent ('bin', 'binary_content.bin');
        let reader = new OV.BinaryReader (buffer, true);
        
        assert.strictEqual (reader.GetByteLength (), 166);
        assert.strictEqual (reader.ReadBoolean8 (), true);
        assert.strictEqual (reader.ReadBoolean8 (), false);
        
        assert.strictEqual (String.fromCharCode (reader.ReadCharacter8 ()), 'a');
        assert.strictEqual (String.fromCharCode (reader.ReadCharacter8 ()), 'A');
        assert.strictEqual (String.fromCharCode (reader.ReadUnsignedCharacter8 ()), 'a');
        assert.strictEqual (String.fromCharCode (reader.ReadUnsignedCharacter8 ()), 'A');

        assert.strictEqual (reader.ReadInteger16 (), 42);
        assert.strictEqual (reader.ReadInteger16 (), -42);
        assert.strictEqual (reader.ReadInteger16 (), 32000);
        assert.strictEqual (reader.ReadInteger16 (), -32000);

        assert.strictEqual (reader.ReadUnsignedInteger16 (), 42);
        assert.strictEqual (reader.ReadUnsignedInteger16 (), 65494);
        assert.strictEqual (reader.ReadUnsignedInteger16 (), 32000);
        assert.strictEqual (reader.ReadUnsignedInteger16 (), 33536);

        assert.strictEqual (reader.ReadInteger32 (), 42);
        assert.strictEqual (reader.ReadInteger32 (), -42);
        assert.strictEqual (reader.ReadInteger32 (), 32000);
        assert.strictEqual (reader.ReadInteger32 (), -32000);
        assert.strictEqual (reader.ReadInteger32 (), 2000000000);
        assert.strictEqual (reader.ReadInteger32 (), -2000000000);

        assert.strictEqual (reader.ReadUnsignedInteger32 (), 42);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 4294967254);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 32000);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 4294935296);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 2000000000);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 2294967296);

        assert.strictEqual (reader.ReadInteger32 (), 42);
        assert.strictEqual (reader.ReadInteger32 (), -42);
        assert.strictEqual (reader.ReadInteger32 (), 32000);
        assert.strictEqual (reader.ReadInteger32 (), -32000);
        assert.strictEqual (reader.ReadInteger32 (), 2000000000);
        assert.strictEqual (reader.ReadInteger32 (), -2000000000);

        assert.strictEqual (reader.ReadUnsignedInteger32 (), 42);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 4294967254);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 32000);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 4294935296);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 2000000000);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 2294967296);

        assert.strictEqual (reader.ReadFloat32 (), 42.0);
        assert.strictEqual (reader.ReadFloat32 (), -42.0);
        assert.strictEqual (reader.ReadFloat32 (), 12345.6787109375);
        assert.strictEqual (reader.ReadFloat32 (), -12345.6787109375);

        assert.strictEqual (reader.ReadDouble64 (), 42.0);
        assert.strictEqual (reader.ReadDouble64 (), -42.0);
        assert.strictEqual (reader.ReadDouble64 (), 12345.6789);
        assert.strictEqual (reader.ReadDouble64 (), -12345.6789);
    });

    it ('Binary Writer', function () {
        let writer = new OV.BinaryWriter (27, true);
        writer.WriteBoolean8 (true);
        writer.WriteCharacter8 (1);
        writer.WriteUnsignedCharacter8 (2);
        writer.WriteInteger16 (3);
        writer.WriteUnsignedInteger16 (4);
        writer.WriteInteger32 (5);
        writer.WriteUnsignedInteger32 (6);
        writer.WriteFloat32 (7.5);
        writer.WriteDouble64 (8.5);
        assert (writer.End ());

        let reader = new OV.BinaryReader (writer.GetBuffer (), true);
        assert.strictEqual (reader.GetByteLength (), 27);
        assert.strictEqual (reader.ReadBoolean8 (), true);
        assert.strictEqual (reader.ReadCharacter8 (), 1);
        assert.strictEqual (reader.ReadUnsignedCharacter8 (), 2);
        assert.strictEqual (reader.ReadInteger16 (), 3);
        assert.strictEqual (reader.ReadUnsignedInteger16 (), 4);
        assert.strictEqual (reader.ReadInteger32 (), 5);
        assert.strictEqual (reader.ReadUnsignedInteger32 (), 6);
        assert.strictEqual (reader.ReadFloat32 (), 7.5);
        assert.strictEqual (reader.ReadDouble64 (), 8.5);
    });
});
