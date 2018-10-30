<template>
  <el-card>
    <tree-table :data="data" :columns="columns" border/>
  </el-card>
</template>

<script>
import treeTable from './components/TreeTable';

export default {
  name: 'TreeTable',
  components: { treeTable },
  data() {
    return {
      columns: [
        {
          text: '所有水体',
          value: 'event',
          width: 200,
        },
        {
          text: '水体编码',
          value: 'id',
        },
        {
          text: '站点名称',
          value: 'timeLine',
        },
        {
          text: '水体类型',
          value: 'comment',
        },
      ],
      data: [
        {
          id: 0,
          event: '所有水体0',
          timeLine: 50,
          comment: '无',
        },
        {
          id: 1,
          event: '所有水体1',
          timeLine: 100,
          comment: '无',
          children: [
            {
              id: 2,
              event: '所有水体2',
              timeLine: 10,
              comment: '无',
            },
            {
              id: 3,
              event: '所有水体3',
              timeLine: 90,
              comment: '无',
              children: [
                {
                  id: 4,
                  event: '所有水体4',
                  timeLine: 5,
                  comment: '无',
                },
                {
                  id: 5,
                  event: '所有水体5',
                  timeLine: 10,
                  comment: '无',
                },
                {
                  id: 6,
                  event: '所有水体6',
                  timeLine: 75,
                  comment: '无',
                  children: [
                    {
                      id: 7,
                      event: '所有水体7',
                      timeLine: 50,
                      comment: '无',
                      children: [
                        {
                          id: 71,
                          event: '所有水体71',
                          timeLine: 25,
                          comment: 'xx',
                        },
                        {
                          id: 72,
                          event: '所有水体72',
                          timeLine: 5,
                          comment: 'xx',
                        },
                        {
                          id: 73,
                          event: '所有水体73',
                          timeLine: 20,
                          comment: 'xx',
                        },
                      ],
                    },
                    {
                      id: 8,
                      event: '所有水体8',
                      timeLine: 25,
                      comment: '无',
                    },
                  ],
                },
              ],
            },
          ],
        },
      ],
    };
  },
};
</script>
