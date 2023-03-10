import ky from 'ky';

export const mainServerUrl =
	'https://ksauqt5f5er2djql3atquzas4e0ofpla.lambda-url.ap-northeast-2.on.aws';

export const mainApi = ky.create({ prefixUrl: mainServerUrl });
