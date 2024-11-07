using { cuid , managed } from '@sap/cds/common';

namespace media.db;

entity media : cuid, managed{
    @Core.ContentDisposition.Filename: fileName
    @Core.ContentDisposition.Type: 'inline'
    @Core.MediaType: MediaType
    content: LargeBinary;
    fileName : String;
    @Core.IsMediaType: true
    MediaType : String;
    size: Integer;
    url: String;
}

