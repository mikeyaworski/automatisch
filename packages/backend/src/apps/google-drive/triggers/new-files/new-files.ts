import { IGlobalVariable } from '@automatisch/types';

const newFiles = async ($: IGlobalVariable) => {
  const params = {
    pageToken: undefined as unknown as string,
    orderBy: 'createdTime desc',
    q: `mimeType!='application/vnd.google-apps.folder'`,
    fields: '*',
    pageSize: 1000,
  };

  do {
    const { data } = await $.http.get('/v3/files', { params });
    params.pageToken = data.nextPageToken;

    if (data.files?.length) {
      for (const file of data.files) {
        $.pushTriggerItem({
          raw: file,
          meta: {
            internalId: file.id,
          },
        });
      }
    }
  } while (params.pageToken);
};

export default newFiles;
