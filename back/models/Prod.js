/* 项目信息管理 */
const mongoose = require('mongoose')

const schema = new mongoose.Schema({
  title: String,
  city: String, // 所属城市
  final_time: String, // 总交付时间
  total_rate: String, // 总项目进度
  next_time: String, // 节点交付时间
  next_rate: String, // 节点交付进度
  constract_rate: String, // 合同进度
  constract_money: String, // 合同金额
  re_money_rate: String, // 回款进度
  re_money: String, // 回款金额
  implementation: String, // 实施负责人
  BD: String, // BD负责人
  jion_person: String, // 投入人数
  jion_dates: String, // 投入周期
  notes: String // 项目备注
})

module.exports = mongoose.model('Prod', schema, 'prod')