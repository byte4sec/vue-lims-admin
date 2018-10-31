/* eslint-disable */

export default {
  // 规则案例
  rulesDemo: {
    'rows|30-50': [
      {
        'personId': '@increment(1)',                  // Guid
        'cName': '@cname',                            // 姓名
        'userNO': '@word(1, 2)',                      // 用户编号
        'domainId': '@cword(4, 7)',                   // 办公室
        'eName': '@name',                             // 英文名
        'birthDay': '@date("yyyy-MM-dd")',            // 出生日期
        'email': '@email',                            // 个人邮箱
        'sex': '@pick(["男", "女"])',                 // 性别
        'idCard': '@id',                              // 身份证号
        'orderNum': '@integer(1, 9)',                 // 排序值
        'degree': '@ctitle(4, 5)',                    // 学历
        'mobile': '@string("number", 11)',            // 手机
        'birthPlace': '@county(true)',                // 出生地
        'domainIdArr': '@range(2, 24, 2)',            // 关键岗位
        'tecCompetence': '@cparagraph(1)',            // 技术能力
        'remark': '@cparagraph',                      // 备注
      },
    ],
  },
  // 单步调试
  stopDebug: {
    'tableData1|5': [
      {
        'itemCode|1-3': '@string(number, 6, 6)',
        'analyzeObj|2-4': '@cword',
        'textValue|2-4': '@cword',
        'name': '@cname',
        'dataValue': '@integer(1, 3)',
      },
    ],
  },
  // 综合案例 - 测试项目
  TestProject: {
    'rows|1-15': [
      {
        'analyzeMethodId': '@increment(1)',     // 分析方法id
        'redAnalyzeMethodName': '@cword(4, 7)', // 分析方法名称
        'redCountryStandard': '@cword(4, 7)',   // 国家标准
        'redYearSn': '@date("yyyy")',           // 年份
        'analyzeItemId': '@increment(1)',       // 分析项目Id
        'redAnalyzeItemName': '@cword(4, 7)',   // 分析项目名称
        'sampleType': '@integer(1, 4)',         // 样品类型
        'testCode': '@word(3, 7)',              // 测试编码
        'dimensionId': '@word(1, 3)',           // 计量单位
        'examLimitValue': '',                   // 检出限
        'examLimitValueLess': '',               // 小于检出限
        'validTime': '@integer(0, 15)',         // 样品有效期（h）
        'orderNum': '@integer(0, 5)',           // 排序值
        'mostSignificance': -1,                 // 有效位数
        'mostDecimal': -1,                      // 小数位数
        'testTimelen': '@integer(1, 4)',        // 分配时长
        'basicWorkload': '@integer(1, 8)',      // 基础工作量
        'unitWorkload': '@integer(1, 8)',       // 单位工作量
        'cert': '@integer(0, 3)',               // 测试资质（0、1、2、3）
        'domainCode': '@word(5, 7)',            // 实验室编号
        'testName': '@cword(2, 8)',             // 测试名称
        'remark': '@cword(15, 50)',             // 备注
        'isOutsourcing': '@boolean',            // 是否分包
        'isCompleteField': '@boolean',          // 是否现场数据
        'sampleTypeGroupId': 1,                 // 样品类型分组
        'groupName': '@cword(5-20)',            // 样品类型组名
        'samplingCharge': '@integer(10, 100)',  // 采样费金额
        'testingCharge': '@integer(10, 100)',   // 检测费金额
        'isQCP': '@boolean',                    // 是否做质控平行
        'isQCB': '@boolean',                    // 是否做质控空白
        'kValueFormart': '@integer(1, 3)',      // 斜率有效位数
        'bValueFormart': '@integer(1, 3)',      // 截距小数位数
        'inputMode': '@integer(0, 1)',          // 录入方式（0：默认，1：生物多样性）
        'phonetic': '@word(2, 5)',              // 分析项目拼音缩写
        'isUseFormula': '@boolean',             // 是否启用公式
        'originalRecordId': '@increment(1)',    // 原始记录 id
        'isUseQTFormula': '@boolean',           // 是否启用嵌套公式(检测结果计算出证结果)
      },
    ],
  },
  // 测试人员
  DragSearchData: {
    'rows|5-15': [
      {
        'cName': '@cname',
        'personId': '@increment(1)',
        'orderNum': '@integer(1, 100)',
      },
    ],
  },
};
