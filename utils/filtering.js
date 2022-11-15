const filtering = (category, from, to, region) => {
  let filtering
  //If exists all of them
  if(category && from && to && region){
    filtering = {
      category,
      amount: { $gte: from, $lte: to },
      region
    }
  }

  //If exists only category
  if(category && !from && !to && !region){
    filtering = {
      category
    }
  }

  //If existe category and region
  if(category && !from && !to && region){
    filtering = {
      category,
      region
    }
  }

  //If exist category region and from
  if(category && from && !to && region){
    filtering = {
      category,
      region,
      amount: { $gte: from }
    }
  }

  //If exist category region and to
  if(category && !from && to && region){
    filtering = {
      category,
      region,
      amount: { $lte: to }
    }
  }

  //If exist only category and from
  if(category && from && !to && !region){
    filtering = {
      category,
      amount: { $gte: from }
    }
  }

  //If exist category and to
  if(category && !from && to && !region){
    filtering = {
      category,
      amount: { $lte: to }
    }
  }

  //If exist category  from and to
  if(category && from && to && !region){
    filtering = {
      category,
      amount: { $gte: from, $lte: to }
    }
  }

  //If exist only from
  if(!category && from && !to && !region){
    filtering = {
      amount: { $gte: from }
    }
  }

  //If exist from and to
  if(!category && from && to && !region){
    filtering = {
      amount: { $gte: from, $lte: to }
    }
  }

  //If exist from and to and region
  if(!category && from && to && region){
    filtering = {
      region,
      amount: { $gte: from, $lte: to }
    }
  }

  //If exist from and region
  if(!category && from && !to && region){
    filtering = {
      region,
      amount: { $gte: from }
    }
  }

  //If exist only to 
  if(!category && !from && to && !region){
    filtering = {
      amount: { $lte: to }
    }
  }

  //If exist to and region
  if(!category && !from && to && region){
    filtering = {
      region,
      amount: { $lte: to }
    }
  }

  //If exist only region
  if(!category && !from && !to && region){
    filtering = {
      region,
    }
  }

  //If not exist any of them
  if(!category && !from && !to && !region){
    filtering = {}
  }

  return filtering
}

module.exports = filtering