export default {
  // 动态树
  operateTree: {
    'rows|2-5': [
      {
        rowGuid: '@increment(1)',
        label: '@cword(3, 7)',
        children: [
          {
            rowGuid: '@increment(1)',
            label: '@cword(3, 7)',
          },
          {
            rowGuid: '@increment(1)',
            label: '@cword(3, 7)',
            children: [
              {
                rowGuid: '@increment(1)',
                label: '三级 1-1-1',
                children: [
                  {
                    rowGuid: '@increment(1)',
                    label: '三级 2-1-1',
                  },
                ],
              },
            ],
          },
        ],
      },
    ],
  },
};
