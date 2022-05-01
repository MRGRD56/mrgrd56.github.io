import convertJsonToTypeScript from '../utils/convertJsonToTypeScript';
import JsonToTypeScriptConversionOptions from '../types/JsonToTypeScriptConversionOptions';
import ExportType from '../types/ExportType';

const defaultOptions: JsonToTypeScriptConversionOptions = {
    exportType: ExportType.ES_MODULE,
    isReversedOrder: true,
    rootTypeName: 'Root'
};

test('test1', () => {
    const json = `
[
    2,
    4,
    "",
    {
        "id": 122
    },
    {
        "id": 123214,
        "name": "ewrwereeve"
    }
]`;

    const expected = `
export type Root = Array<number | string | Root2>;

export interface Root2 {
    id: number;
    name?: string;
}`.trimStart();

    const actual = convertJsonToTypeScript(json, defaultOptions);

    expect(actual).toBe(expected);
});

test('test2', () => {
    const json = `{
  "suggestions": [{
    "feature_name": "〒105-0004 東京都港区新橋1丁目10番1号",
    "matching_name": "〒105-0004 東京都港区新橋1丁目10番1号",
    "description": "",
    "result_type": [
      "address"
    ],
    "language": "ja",
    "action": {
      "endpoint": "retrieve",
      "method": "POST",
      "body": {
        "id": "abc123"
      },
      "multi_retrievable": false
    },
    "maki": "marker",
    "internal_id": "example internal id",
    "external_ids": {
      "service": "2wwRMXwBRYqRl13lTvTP"
    },
    "context": [{
        "layer": "block",
        "localized_layer": "block",
        "name": "10"
      },
      {
        "layer": "neighborhood",
        "localized_layer": "chome",
        "name": "1丁目"
      },
      {
        "layer": "locality",
        "localized_layer": "oaza",
        "name": "新橋"
      },
      {
        "layer": "place",
        "localized_layer": "city",
        "name": "港区"
      },
      {
        "layer": "region",
        "localized_layer": "prefecture",
        "name": "東京都"
      }
    ],
    "metadata": {
      "iso_3166_1": "jp",
      "iso_3166_2": "JP-13",
      "reading": {
        "ja_kana": "ﾄｳｷｮｳﾄﾐﾅﾄｸｼﾝﾊﾞｼ",
        "ja_latin": "toukyouto minatoku shinbashi"
      }
    }
  }],
  "attribution": "© 2021 Mapbox and its suppliers. All rights reserved. Use of this data is subject to the Mapbox Terms of Service. (https://www.mapbox.com/about/maps/)",
  "version": "11:061a06471ec519420eeca5be2b87e043f2fe4cbe",
  "response_uuid": "4b659949-c8c7-42d8-a541-6b427e5806cc"
}`;

    const expected = `
export interface Root {
    suggestions: Suggestion[];
    attribution: string;
    version: string;
    response_uuid: string;
}

export interface Suggestion {
    feature_name: string;
    matching_name: string;
    description: string;
    result_type: string[];
    language: string;
    action: Action;
    maki: string;
    internal_id: string;
    external_ids: ExternalIds;
    context: Context[];
    metadata: Metadata;
}

export interface Action {
    endpoint: string;
    method: string;
    body: Body;
    multi_retrievable: boolean;
}

export interface Body {
    id: string;
}

export interface ExternalIds {
    service: string;
}

export interface Context {
    layer: string;
    localized_layer: string;
    name: string;
}

export interface Metadata {
    iso_3166_1: string;
    iso_3166_2: string;
    reading: Reading;
}

export interface Reading {
    ja_kana: string;
    ja_latin: string;
}`.trimStart();

    const actual = convertJsonToTypeScript(json, defaultOptions);

    expect(actual).toBe(expected);
});

export {};
