<template>
  <div>
    <Header2/>
    <div class="detail-container" >
      <BackTop />
      <div class="breadcrumb">
        <div class="nav">
          <router-link to="/">Home</router-link>  > <router-link :to="{path: '/browse', query: query}">List</router-link> >{{ detail['address']['city'] }}
        </div>
      </div>
      <div class="detail-content" onload="popval()">
        <div class="detail-box1 clearfix">
          <div class="detail-left pull-left">
            <el-carousel trigger="click" v-bind:height="carouselHeight">
              <el-carousel-item v-for="(item, index) in housePicList" :key="item">
                <img :src="item" alt="" v-bind:class="'carousel-img' + index"/>
              </el-carousel-item>
            </el-carousel>
          </div>
          <div class="detail-right pull-right">
            <div class="title">
              <h1>{{ detail['address']['city'] }} </h1>
              <h3>{{ detail['address']['city'] }}, {{ detail['address']['state'] }} {{ detail['address']['postalCode'] }}</h3>
            </div>
            <div class="sub-tit"> {{ detail.address['unparsed'] }}</div>
            <div class="spec">
              <span class="btn"><strong>{{ detail.mlsListing['beds'] }}</strong> beds</span>
              <span class="btn"><strong>{{ detail.mlsListing['bathsF'] }}</strong> baths</span>
              <span class="btn"><strong>{{ detail.mlsListing['bldgSqft'] }}</strong> sqft</span>
<!--              <span class="btn"><strong>{{ detail.mlsListing.baths }}</strong> lot</span>-->
            </div>
            <div class="tags-list">
              <span class="tag pros tooltip">0.08 (up to 0.45) FAR <span class="tooltiptext">0.08 (up to 0.45) FAR</span></span>
              <span class="tag pros tooltip">{{ 33 }} days on market <span class="tooltiptext">{{ 33 }} days on market</span></span>
              <span class="tag pros tooltip">{{ 9000 }} rent est <span class="tooltiptext">{{ 9000 }} rent est</span></span>
              <span class="tag pros tooltip">5.5% cap rate <span class="tooltiptext">5.5% cap rate</span></span>
              <span class="tag pros tooltip">11% ROI (5yr) <span class="tooltiptext">11% ROI (5yr)</span></span>
              <span class="tag pros tooltip">single_family GP PR Zoning <span class="tooltiptext">single_family GP PR Zoning</span></span>
              <span class="tag cons tooltip">ADU / Opportunity / Zone / AirBnb <span class="tooltiptext">ADU / Opportunity / Zone / AirBnb</span></span>
              <span class="tag cons tooltip">Creek / Noisy / Railroad <span class="tooltiptext">Creek / Noisy / Railroad </span></span>
              <span class="tag cons tooltip">{{ detail.mlsListing.address.postalCode }} <span class="tooltiptext">{{ detail.mlsListing.address.postalCode }} </span></span>
              <span class="tag cons tooltip">5.5 crime index <span class="tooltiptext">5.5 crime index </span></span>
              <span class="tag cons tooltip">{{ 120000 }} household income <span class="tooltiptext">{{ 120000 }} household income</span></span>
            </div>
            <div class="price"> $ {{ detail.mlsListing.listPrice | toThousandFilter }}</div>
            <div class="invest">
              <span class="btn">Invest</span>
            </div>
          </div>
        </div>
        <div class="detail-box2 clearfix">
          <ul class="tabs clearfix" id="tabs-top" v-bind:class="{fixedTabs: isFixedTabs}">
            <li
                v-bind:class="{ active: activeIndex === index }"
                @click="changeDetailTab(item, index)"
                v-for="(item, index) in detailTabList"
                :key="item"
            >
              <a :href="'#content-box' + (index+1)">{{ item }}</a>
            </li>
          </ul>
          <div class="tab-content">

            <div id="content-box1" class="content-box content-box1">
              <h2>Public Record</h2>
              <table class="table">
                <tr>
                  <th></th>
                  <th>Public Record</th>
                  <th>MLS</th>
                </tr>
                <tr>
                  <td>Sqft</td>
                  <td>{{ prop.mlsListing.bldgSqft }}</td>
                  <td>{{ prop.mlsListing.bldgSqft }}</td>
                </tr>
                <tr>
                  <td>Beds</td>
                  <td>{{ prop.mlsListing.beds }}</td>
                  <td>{{ prop.mlsListing.beds }}</td>
                </tr>
                <tr>
                  <td>Baths</td>
                  <td></td>
                  <td>{{ prop.mlsListing.bathsF }}</td>
                </tr>
                <tr>
                  <td>Stories</td>
                  <td></td>
                  <td>{{ prop.mlsListing.stories }}</td>
                </tr>
                <tr>
                  <td>Lot Size</td>
                  <td>{{ detail.lot_size }}</td>
                  <td>{{ prop.mlsListing.stories }}</td>
                </tr>
                <tr>
                  <td>Style</td>
                  <td>Mutli</td>
                  <td>{{ prop.mlsListing.stories }}</td>
                </tr>
                <tr>
                  <td>Year Build</td>
                  <td>{{ detail.year_built }}</td>
                  <td>{{ prop.mlsListing.yrBlt }}</td>
                </tr>
                <tr>
                  <td>Year Renovated</td>
                  <td>1900</td>
                  <td>{{ prop.mlsListing.stories }}</td>
                </tr>
                <tr>
                  <td>Country</td>
                  <td>Santa</td>
                  <td>{{ prop.mlsListing.address.county }}</td>
                </tr>
                <tr>
                  <td>APN</td>
                  <td>Santa</td>
                  <td>{{ prop.mlsListing.parcelNumber }}</td>
                </tr>
              </table>
            </div>
            <div id="content-box2" class="content-box content-box2">
              <h2>Demographics</h2>
              <div class="demographics">
                <el-tabs v-model="demographicsActiveName" type="card" @tab-click="handleDemographicsClick">
                  <el-tab-pane label="Income" name="demographicsIncome">
<!--                    <div class="top-title clearfix">
                      <div class="top-title-left">Median household income</div>
                      <div class="top-title-right">{{prop.zipcodeStats[0].MEDHINCCY}}</div>
                      <div class="top-title-left">Average household income</div>
                      <div class="top-title-right">{{prop.zipcodeStats[0].AVGHINCCY}}</div>
                    </div>-->
<!--                    <div class="top-title">
                      <table class="table">
                        <tr>
                          <th></th>
                          <th>{{prop.zipcodeStats[0].state}}</th>
                          <th>{{prop.address.city}}</th>
                        </tr>
                        <tr v-for="item in mediaIncomeList" :key="item.name">
                          <td>{{item.name}}</td>
                          <td>{{item.median}}</td>
                          <td>{{item.average}}</td>
                        </tr>
                      </table>
                    </div>-->
                    <div class="echarts">
                      <div id="mainIncome" style="width: 600px;height:400px;margin: 0 auto;"></div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/income-map.png" alt="">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Age" name="demographicsAge">
                    <div class="top-title clearfix">
                      <div class="top-title-left">Median Age</div>
                      <div class="top-title-right">{{prop.zipcodeStats[2].MEDAGECY}}</div>
                    </div>
                    <div class="echarts">
                      <div id="mainAge" style="width: 80%;height:400px;margin: 0 auto;"></div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/income-map.png" alt="">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Education" name="demographicsEducation">
                    <div class="top-title">
                      <table class="table">
                        <tr>
                          <th>Education</th>
                          <th>Population</th>
                        </tr>
                        <tr v-for="item in educationIncomeList" :key="item.name">
                          <td>{{item.name}}</td>
                          <td>{{item.population}}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="echarts">
                      <div id="mainEducation" style="width: 600px;height:400px;margin: 0 auto;"></div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/income-map.png" alt="">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Employment" name="demographicsEmployment">
                    <div class="top-title">
                      <table class="table">
                        <tr>
                          <th>Occupation</th>
                          <th>Population</th>
                        </tr>
                        <tr v-for="item in occupationIncomeList" :key="item.name">
                          <td>{{item.name}}</td>
                          <td>{{item.population}}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="echarts">
                      <div id="mainEmployment" style="width: 600px;height:400px;margin: 0 auto;"></div>
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Race" name="demographicsRace">
                    <div class="top-title">
                      <table class="table">
                        <tr>
                          <th>Race</th>
                          <th>Population</th>
                        </tr>
                        <tr v-for="item in raceIncomeList" :key="item.name">
                          <td>{{item.name}}</td>
                          <td>{{item.population}}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="echarts">
                      <div id="mainRace" style="width: 100%;height:400px;margin: 0 auto;"></div>
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div id="content-box3" class="content-box content-box3">
              <h2>crime</h2>
              <div class="crime">
                <el-tabs v-model="crimeActiveName" type="card" @tab-click="handleCrimeClick">
                  <el-tab-pane label="Crime Index" name="crimeIndex">
                    <div class="top-title">
                      <table class="table">
                        <tr>
                          <th>Crime Name</th>
                          <th>Crime Index</th>
                        </tr>
                        <tr v-for="item in crimeIndexValueList" :key="item.name">
                          <td>{{item.name}}</td>
                          <td>{{item.index}}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="echarts">
                      <div id="mainCrimeIndex" style="width: 600px;height:400px;margin: 0 auto;"></div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/income-map.png" alt="">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Crime Aggregate" name="crimeAggregate">
                    <div class="top-title">
                      <table class="table">
                        <tr>
                          <th>Crime Name</th>
                          <th>Crime Index</th>
                        </tr>
                        <tr v-for="item in crimeAggregateValueList" :key="item.name">
                          <td>{{item.name}}</td>
                          <td>{{item.index}}</td>
                        </tr>
                      </table>
                    </div>
                    <div class="echarts">
                      <div id="mainCrimeAggregate" style="width: 600px;height:400px;margin: 0 auto;"></div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/crime-map.png" alt="">
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div id="content-box4" class="content-box content-box4">
              <h2>Schools</h2>
              <div class="schools-content">
                <div>
                  <table class="basic-table-3">
                    <tbody>
                    <tr class="schools-table-row">
                      <td class="rating-and-name-col">
                        <div class="gs-rating-col">
                          <div class="ellipse">
                            <div class="gs-rating-text"><span class="rating-num">9</span><span class="out-of">/10</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="rating-and-name-col">
                        <div class="name-col">
                          <div class="name-and-info">
                            <div class="school-name font-size-base" data-rf-test-name="school-name">
                              <div class="school-title" role="button">Fairmeadow Elementary School</div>
                            </div>
                            <div class="sub-info font-color-gray-light font-size-small">Public<!-- --> • <!-- -->K to
                              5<span> • </span><span class="serves-home">Serves this home</span></div>
                          </div>
                        </div>
                      </td>
                      <td class="num-students-col">
                        <div class="students">445</div>
                        <div class="sub-info font-color-gray-light font-size-small">Students</div>
                      </td>
                      <td class="rating-col">
                        <div class="star-rating rating-row">
                          <div class="StarRating">
                            <el-rate
                                v-model="value"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                          </div>
                          <div class="num-reviews sub-info font-size-small" role="button" tabindex="0">8<!-- -->
                            reviews
                          </div>
                        </div>
                      </td>
                      <td class="distance-col">
                        <div class="value">0.3 mi</div>
                        <div class="sub-info font-color-gray-light font-size-small">Distance</div>
                      </td>
                    </tr>
                    <tr class="schools-table-row">
                      <td class="rating-and-name-col">
                        <div class="gs-rating-col">
                          <div class="ellipse">
                            <div class="gs-rating-text"><span class="rating-num">9</span><span class="out-of">/10</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="rating-and-name-col">
                        <div class="name-col">
                          <div class="name-and-info">
                            <div class="school-name font-size-base" data-rf-test-name="school-name">
                              <div class="school-title" role="button">Fairmeadow Elementary School</div>
                            </div>
                            <div class="sub-info font-color-gray-light font-size-small">Public<!-- --> • <!-- -->K to
                              5<span> • </span><span class="serves-home">Serves this home</span></div>
                          </div>
                        </div>
                      </td>
                      <td class="num-students-col">
                        <div class="students">445</div>
                        <div class="sub-info font-color-gray-light font-size-small">Students</div>
                      </td>
                      <td class="rating-col">
                        <div class="star-rating rating-row">
                          <div class="StarRating">
                            <el-rate
                                v-model="value"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                          </div>
                          <div class="num-reviews sub-info font-size-small" role="button" tabindex="0">8<!-- -->
                            reviews
                          </div>
                        </div>
                      </td>
                      <td class="distance-col">
                        <div class="value">0.3 mi</div>
                        <div class="sub-info font-color-gray-light font-size-small">Distance</div>
                      </td>
                    </tr>
                    <tr class="schools-table-row">
                      <td class="rating-and-name-col">
                        <div class="gs-rating-col">
                          <div class="ellipse">
                            <div class="gs-rating-text"><span class="rating-num">9</span><span class="out-of">/10</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="rating-and-name-col">
                        <div class="name-col">
                          <div class="name-and-info">
                            <div class="school-name font-size-base" data-rf-test-name="school-name">
                              <div class="school-title" role="button">Fairmeadow Elementary School</div>
                            </div>
                            <div class="sub-info font-color-gray-light font-size-small">Public<!-- --> • <!-- -->K to
                              5<span> • </span><span class="serves-home">Serves this home</span></div>
                          </div>
                        </div>
                      </td>
                      <td class="num-students-col">
                        <div class="students">445</div>
                        <div class="sub-info font-color-gray-light font-size-small">Students</div>
                      </td>
                      <td class="rating-col">
                        <div class="star-rating rating-row">
                          <div class="StarRating">
                            <el-rate
                                v-model="value"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                          </div>
                          <div class="num-reviews sub-info font-size-small" role="button" tabindex="0">8<!-- -->
                            reviews
                          </div>
                        </div>
                      </td>
                      <td class="distance-col">
                        <div class="value">0.3 mi</div>
                        <div class="sub-info font-color-gray-light font-size-small">Distance</div>
                      </td>
                    </tr>
                    <tr class="schools-table-row">
                      <td class="rating-and-name-col">
                        <div class="gs-rating-col">
                          <div class="ellipse">
                            <div class="gs-rating-text"><span class="rating-num">9</span><span class="out-of">/10</span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td class="rating-and-name-col">
                        <div class="name-col">
                          <div class="name-and-info">
                            <div class="school-name font-size-base" data-rf-test-name="school-name">
                              <div class="school-title" role="button">Fairmeadow Elementary School</div>
                            </div>
                            <div class="sub-info font-color-gray-light font-size-small">Public<!-- --> • <!-- -->K to
                              5<span> • </span><span class="serves-home">Serves this home</span></div>
                          </div>
                        </div>
                      </td>
                      <td class="num-students-col">
                        <div class="students">445</div>
                        <div class="sub-info font-color-gray-light font-size-small">Students</div>
                      </td>
                      <td class="rating-col">
                        <div class="star-rating rating-row">
                          <div class="StarRating">
                            <el-rate
                                v-model="value"
                                disabled
                                show-score
                                text-color="#ff9900"
                                score-template="{value}">
                            </el-rate>
                          </div>
                          <div class="num-reviews sub-info font-size-small" role="button" tabindex="0">8<!-- -->
                            reviews
                          </div>
                        </div>
                      </td>
                      <td class="distance-col">
                        <div class="value">0.3 mi</div>
                        <div class="sub-info font-color-gray-light font-size-small">Distance</div>
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </div>
                <div class="more-schools font-weight-bold font-size-smaller"></div>
              </div>
            </div>
            <div id="content-box5" class="content-box content-box5">
              <h2>Noise</h2>
              <div class="top-title clearfix">
                <div class="top-title-left">Noise level</div>
                <div class="top-title-right">{{detail['noise']}}</div>
              </div>
              <div class="map">
                <div id="noiseMap" style="height: 200px">
                  <GmapMap
                      ref="gmap"
                      :center="{lat: detail['geometry']['coordinates'][0], lng: detail['geometry']['coordinates'][1]}"
                      :zoom="5"
                      map-type-id="roadmap"
                      style="width: 100%; height: 100%"
                      :options="{mapTypeControl: false}"
                  >
                  </GmapMap>
                </div>
              </div>
            </div>
            <div id="content-box6" class="content-box content-box6">
              <h2>Hazard</h2>
              <div class="hazard">
                <el-tabs v-model="hazardActive" type="card" @tab-click="handleDemographicsClick">
                  <el-tab-pane label="Flood" name="flood">
                    <div class="top-title clearfix">
                      <div class="top-title-left">Risk </div>
                      <div class="top-title-right">{{detail['hazard']['flood']}}</div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/flood-map.png" alt="">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Earthquake" name="earthquake">
                    <div class="top-title clearfix">
                      <div class="top-title-left">Liquefaction Risk</div>
                      <div class="top-title-right">{{detail['hazard']['liquefactionProp']}}</div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/earthquake-map.png" alt="">
                    </div>
                  </el-tab-pane>
                  <el-tab-pane label="Superfund" name="superfund">
                    <div class="top-title clearfix">
                      <div class="top-title-left">Close to superfund</div>
                      <div class="top-title-right">{{detail['hazard']['superfund']}}</div>
                    </div>
                    <div class="map">
                      <img src="../assets/images/income-map.png" alt="">
                    </div>
                  </el-tab-pane>
                </el-tabs>
              </div>
            </div>
            <div id="content-box7" class="content-box content-box7">
              <h2>Convenience</h2>
              <div class="convenience">
                <div class="map">
                  <img src="../assets/images/convenience-map.png" alt="">
                </div>
              </div>
            </div>
            <div id="content-box8" class="content-box content-box8">
              <h2>Market</h2>
              <div class="market potential">
                <div class="top-title clearfix">
                  <div class="top-title-left">equity > 20% (94040)</div>
                  <div class="top-title-right">50%</div>
                  <div class="top-title-left">equity > 20% (San Jose)</div>
                  <div class="top-title-right">52%</div>
                  <div class="top-title-left">median days on market</div>
                  <div class="top-title-right">43</div>
                </div>
                <div class="echarts">
                  <div id="mainMarket" style="width: 600px;height:400px;margin: 0 auto;"></div>
                </div>
              </div>
            </div>
            <div id="content-box9" class="content-box content-box9">
              <h2>Potential</h2>
              <div class="potential">
                <div class="top-title clearfix">
                  <div class="top-title-left">creek</div>
                  <div class="top-title-right">&nbsp;1</div>
                  <div class="top-title-left">sqft</div>
                  <div class="top-title-right">&nbsp;2</div>
                  <div class="top-title-left">Lot size</div>
                  <div class="top-title-right">&nbsp;</div>
                  <div class="top-title-left">FAR</div>
                  <div class="top-title-right">&nbsp;</div>
                  <div class="top-title-left">ADU</div>
                  <div class="top-title-right">&nbsp;</div>
                  <div class="top-title-left">Zoning</div>
                  <div class="top-title-right">&nbsp;</div>
                  <div class="top-title-left">Opportunity Zone</div>
                  <div class="top-title-right">No</div>
                  <div class="top-title-left">industrial</div>
                  <div class="top-title-right">No</div>
                  <div class="top-title-left">commercial</div>
                  <div class="top-title-right">No</div>
                  <div class="top-title-left">t_junction</div>
                  <div class="top-title-right">No</div>
                  <div class="top-title-left">historic</div>
                  <div class="top-title-right">No</div>
                  <div class="top-title-left">annexed</div>
                  <div class="top-title-right">No</div>
                  <div class="top-title-left">4 lane st</div>
                  <div class="top-title-right">No</div>
                  <div class="top-title-left">dist to powerline</div>
                  <div class="top-title-right">No</div>
                </div>
              </div>
            </div>
            <div id="content-box10" class="content-box content-box10">
              <h2>Investment</h2>
              <div class="investment" >
                <form name="calc" method="POST">
<!--                  <input placeholder="Property Address" class="el-input__inner" name="address"
                         style="margin-bottom: 15px; width: 100%" >-->
                  <table style="width:100%;" border="0"  class="table">
                    <tbody>
                    <tr>
                      <th bgcolor="#aaaaaa" width="25%">Name</th>
                      <th bgcolor="#aaaaaa" width="25%">Value</th>
                      <th bgcolor="#aaaaaa" width="25%">Name</th>
                      <th bgcolor="#aaaaaa" width="25%">Value</th>
                    </tr>
                    <tr>
                      <td>Total Price</td>
                      <td align="right"> $ <input type="number" style="padding-right: 0" min="0" max="100000000" 
                                                  step="5000" class="el-input__inner" name="housePrice" value="500000" size="10"></td>
                      <td bgcolor="#eeeeee">Loan Amount</td>
                      <td bgcolor="#eeeeee" align="right"> $ <input type="text"  class="el-input__inner"  name="loanAmount" size="10"></td>
                    </tr>
                    <tr>
                      <td>Downpay ( $  or %)</td>
                      <td align="right"><input type="number" style="padding-right: 0" min="0" max="100000000" class="el-input__inner"  
                                               name="downpay" size="10" value="100000"></td>
                      <td>Years of Loan</td>
                      <td align="right"> <input type="number" style="padding-right: 0" min="0" max="100" step="1" class="el-input__inner"  
                                                name="yearsOfLoan" size="10" value="30"></td>
                    </tr>
                    <tr>
                      <td bgcolor="#eeeeee">Monthly Payment</td>
                      <td bgcolor="#eeeeee" align="right"> $ <input type="text" class="el-input__inner" name="monMortgage" size="10"></td>
                      <td>Interest Rate</td>
                      <td align="right"><input type="number" style="padding-right: 0;width: 55%" min="0" max="100" step="0.1" 
                                               class="el-input__inner" name="mortRate" size="10" value="3.6">%</td>
                    </tr>
                    <tr>
                      <td>Annual Property Tax ( $  or %)</td>
                      <td align="right"><input type="number" style="padding-right: 0" min="0" max="1000000" class="el-input__inner"
                                               name="taxRate" size="10" value="1.8"></td>
                      <td bgcolor="#eeeeee">Num of Pays</td>
                      <td bgcolor="#eeeeee" align="right"><input type="text"  class="el-input__inner" name="numOfPays" size="10"></td>
                    </tr>
                    <tr>
                      <td>Annual Ins</td>
                      <td align="right"> $ <input type="number" style="padding-right: 0" min="0" max="100000" step="10"
                                                  class="el-input__inner"  name="annIns" size="10" value="650"></td>
                      <td bgcolor="#eeeeee">Total Cost of Loan</td>
                      <td bgcolor="#eeeeee" align="right"> $ <input type="text"  class="el-input__inner"  name="sumOfPays" size="10"></td>
                    </tr>
                    <tr>
                      <td>Monthly HOA</td>
                      <td align="right"> $ <input type="number" style="padding-right: 0" min="0" max="10000" step="10"
                                                  class="el-input__inner"  name="monHOA" size="10" value="150"></td>
                      <td bgcolor="#eeeeee">Interest Cost</td>
                      <td bgcolor="#eeeeee" align="right"> $ <input type="text"  class="el-input__inner"  name="interestCost" size="10"></td>
                    </tr>
                    <tr>
                      <td>Monthly Other</td>
                      <td align="right"> $ <input type="number" style="padding-right: 0" min="0" max="10000" step="1"
                                                  class="el-input__inner"  name="monOther" size="10" value="50"></td>
                    </tr>
                    <tr>
                      <td>Monthly Rent First Year</td>
                      <td align="right"> $ <input type="number" style="padding-right: 0" min="0" max="100000" step="100"
                                                  class="el-input__inner"  name="monRent" size="10" value="2650"></td>
                      <td bgcolor="#eeeeee">Loan Bal</td>
                      <td bgcolor="#eeeeee" align="right"> $ <input type="text"  class="el-input__inner"  name="loanBal" size="10"></td>
                    </tr>
                    <tr>
                      <td>Annual Rent Increase</td>
                      <td align="right"><input type="number" style="padding-right: 0;width: 55%" min="0" max="100"
                                               step="0.1" class="el-input__inner"  name="annAnRtInc" size="10" value="8.0">%</td>
                    </tr>
                    <tr>
                      <td bgcolor="#eeeeee">Monthly Earn First Year</td>
                      <td bgcolor="#eeeeee" align="right"> $ <input type="text"  class="el-input__inner"  name="monTotal" size="10"></td>
                      <td bgcolor="#ffaaaa">Selling Price</td>
                      <td bgcolor="#ffaaaa" align="right"> $ <input type="text"  class="el-input__inner"  name="sellPrice" size="10"></td>
                    </tr>
                    <tr>
                      <td>After Years</td>
                      <td align="right"><input type="number" style="padding-right: 0" min="0" max="1000" step="1"
                                               class="el-input__inner"  name="afterYears" size="10" value="10"></td>
                      <td bgcolor="#ffaaaa">Total Cash Flow</td>
                      <td bgcolor="#ffaaaa" align="right"> $ <input type="text"  class="el-input__inner"  name="cashTotal" size="10"></td>
                    </tr>
                    <tr>
                      <td bgcolor="#eeeeee">Monthly Rent Last Year</td>
                      <td bgcolor="#eeeeee" align="right"> $ <input type="text"  class="el-input__inner"  name="monRentLastYear" size="10"></td>
                      <td bgcolor="#ffaaaa">Appreciation Gain</td>
                      <td bgcolor="#ffaaaa" align="right"> $ <input type="text"  class="el-input__inner"  name="totalApprn" size="10"></td>
                    </tr>
                    <tr>
                      <td>Annual Appreciation</td>
                      <td align="right"><input type="number" style="padding-right: 0;width: 55%" min="0" max="100"
                                               step="0.1" class="el-input__inner"  name="annAppre" size="10" value="5.0">%</td>
                      <td bgcolor="#ffaaaa">Net Earn</td>
                      <td bgcolor="#ffaaaa" align="right"> $ <input type="text"  class="el-input__inner"  name="totalEarn" size="10"></td>
                    </tr>
                    <tr>
                      <td>Selling Cost</td>
                      <td align="right"><input type="number" style="padding-right: 0;width: 55%" min="0" max="100"
                                               step="0.1" class="el-input__inner"  name="sellingCost" size="10" value="6.5">%</td>
                      <td bgcolor="#ffaaaa">Annual Return</td>
                      <td bgcolor="#ffaaaa" align="right"><input  style="width: 55%"  type="text"  class="el-input__inner" name="annualReturn" size="10">%</td>
                    </tr>
                    <tr>
                      <td></td>
                      <td></td>
                      <td align="center">
                        <input type="button" @click="showpay()" value="Calculate" class="el-button el-button--default el-button--small  pull-right">
                      </td>
                      <td align="center">
                        <input type="reset" value="Reset" class="el-button el-button--small el-button--warning pull-right">
                      </td>
                    </tr>
                    </tbody>
                  </table>
                </form>

                <div class="clearfix" v-if="false">
                  <input type="text" id="shareUrl" size="20" class="el-input__inner pull-left" >
                  <input type="button" @click="shareUrl()" value="Share Link"
                         class="el-button el-button--default el-button--small pull-left" style="margin-left: 10px">
                </div>

                <div v-if="false" style="text-align: left;width: 100%">Annual return (%) when sell after years:</div>

                <div class="ct-chart ct-double-octave" style="height: 150px" v-if="false">
                  <chartist
                      ratio="ct-major-second"
                      type="Line"
                      :data="chartData"
                      :options="chartOptions" >
                  </chartist>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <InvestBuyTabs/>
    </div>
    <Footer/>
  </div>
</template>

<script>

import axios from 'axios'
import Header2 from "@/components/Header2";
import BackTop from "@/components/BackTop";
import Footer from "@/components/Footer";
import * as echarts from 'echarts'
import InvestBuyTabs from "@/components/InvestBuyTabs";
import {gmapApi} from 'vue2-google-maps'

export default {
  name: 'Property',
  components: {
    Header2,
    Footer,
    InvestBuyTabs,
    BackTop
  },
  data() {
    return {
      topHeight: 200,
      chartData: {},
      chartOptions: {
        lineSmooth: false
      },
      detail: {
        address: {},
        mlsListing: {},
        zipcodeStats: []
      },
      carouselHeight: '484px',
      isFixedTabs: false,
      housePicList: [],
      demographicsActiveName: 'demographicsIncome',
      crimeActiveName: 'crimeIndex',
      query: '',
      detailTabList: [
        "Public record",
        "Demographics",
        "Crime",
        "Schools",
        "Noise",
        "hazard",
        "Convenience",
        "Market",
        "Potential",
        "Investment"
      ],

      activeIndex: 0,
      value: 3.7,
      hazardActive: 'flood',
      mediaIncomeList: [],
      occupationList: [
        "Management",
        "Business/Financial",
        "Computer/Mathematical",
        "Architecture/Engineering",
        "Life/Physical/Social Science",
        "Community/Social Service",
        "Legal",
        "Education/Training/Library",
        "Arts/Design/Entertainment/Sports/Media",
        "Healthcare Practitioner/Technician",
        "Healthcare Support",
        "Protective Service",
        "Food Preparation/Serving Related",
        "Building/Grounds Cleaning/Maintenance",
        "Personal Care/Service",
        "Sales and Sales Related",
        "Office/Administrative Support",
        "Farming/Fishing/Forestry",
        "Construction/Extraction",
        "Installation/Maintenance/Repair",
        "Production",
        "Transportation/Material Moving"
      ],
      occupationIncomeList: [],
      raceList: [
        "White Population",
        "Black/African American Population",
        "American Indian/Alaska Native Population",
        "Asian Population",
        "Pacific Islander Population",
        "Other Race Population",
        "Population of Two or More Races",
        "Hispanic Population",
        "Hispanic White Population",
        "Hispanic Black/African American Population",
        "Hispanic American Indian/Alaska Native Population",
        "Hispanic Asian Population",
        "Hispanic Pacific Islander Population",
        "Hispanic Other Race Population",
        "Hispanic Population of Two or More Races",
        "Non-Hispanic Population",
        "White Non-Hispanic Population",
        "Black/African American Non-Hispanic Population",
        "American Indian/Alaska Native Non-Hispanic Population",
        "Asian Non-Hispanic Population",
        "Pacific Islander Non-Hispanic Population",
        "Other Race Non-Hispanic Population",
        "Multiple Races Non-Hispanic Population",
        "Minority Population"
      ],
      raceIncomeList: [],
      educationList: [
        "Less than 9th Grade",
        "9-12th Grade/No Diploma",
        "High School Diploma",
        "GED/Alternative Credential",
        "Some College/No Degree",
        "Associate's Degree",
        "Bachelor's Degree",
        "Graduate/Professional Degree"
      ],
      educationIncomeList: [],
      crimeIndexList: [
        "Personal Crime Index (AGS)",
        "Murder Index (AGS)",
        "Rape Index (AGS)",
        "Robbery Index (AGS)",
        "Assault Index (AGS)",
        "Property Crime Index (AGS)",
        "Burglary Index (AGS)",
        "Larceny Index (AGS)",
        "Motor Vehicle Theft Index (AGS)"
      ],
      crimeIndexValueList: [],
      crimeAggregateList: [
        "Total Crime Aggregate (AGS)",
        "Personal Crime Aggregate (AGS)",
        "Murder Aggregate (AGS)",
        "Rape Aggregate (AGS)",
        "Robbery Aggregate (AGS)",
        "Assault Aggregate (AGS)",
        "Property Crime Aggregate (AGS)",
        "Burglary Aggregate (AGS)",
        "Larceny Aggregate (AGS)",
        "Motor Vehicle Theft Aggregate (AGS)"
      ],
      crimeAggregateValueList: [],
      prop: {
        address: {},
        mlsListing: {},
        zipcodeStats: []
      },
    }
  },
  canActivate (transition) {
    console.log(transition,"======上一个页面的url信息=======");
    transition.next();
  },
  methods: {
    handleDemographicsClick(tab, event) {
      console.log(tab,event)
      if (this.demographicsActiveName === 'demographicsIncome') {
        setTimeout(() => {
          this.drawChartIncome();
        })
      }
      if (this.demographicsActiveName === 'demographicsAge') {
        setTimeout(() => {
          this.drawChartAge();
        })
      }
      if (this.demographicsActiveName === 'demographicsEducation') {
        setTimeout(() => {
          this.drawChartEducation();
        })
      }
      if (this.demographicsActiveName === 'demographicsEmployment') {
        setTimeout(() => {
          this.drawChartEmployment();
        })
      }
      if (this.demographicsActiveName === 'demographicsRace') {
        setTimeout(() => {
          this.drawChartRace();
        })
      }

    },
    handleCrimeClick(tab, event) {
      console.log(tab, event);
      console.log(this.crimeActiveName)
      if (this.crimeActiveName === 'crimeIndex') {
        setTimeout(() => {
          console.log(document.getElementById("mainCrimeIndex"))
          this.drawChartCrimeIndex();
        })
      }
      if (this.crimeActiveName === 'crimeAggregate') {
        setTimeout(() => {
          console.log(document.getElementById("mainCrimeAggregate"))
          this.drawChartCrimeAggregate();
        })
      }
    },
    changeDetailTab(item, index) {
      this.activeIndex = index
    },

    handleScroll() {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop || document.body.scrollTop
      // console.log(scrollTop)
      const tabsTop = document.getElementById('tabs-top')?.offsetTop;
      this.isFixedTabs = scrollTop > tabsTop;
      const contentBox1Ele = document.getElementById('content-box1');
      const contentBox2Ele = document.getElementById('content-box2');
      const contentBox3Ele = document.getElementById('content-box3');
      const contentBox4Ele = document.getElementById('content-box4');
      const contentBox5Ele = document.getElementById('content-box5');
      const contentBox6Ele = document.getElementById('content-box6');
      const contentBox7Ele = document.getElementById('content-box7');
      const contentBox8Ele = document.getElementById('content-box8');
      const contentBox9Ele = document.getElementById('content-box9');
      const contentBox10Ele = document.getElementById('content-box10');
      const contentBox1 = contentBox1Ele.offsetTop;
      const contentBox2 = contentBox2Ele.offsetTop + contentBox2Ele.offsetHeight*0.5;
      const contentBox3 = contentBox3Ele.offsetTop + contentBox3Ele.offsetHeight*0.5;
      const contentBox4 = contentBox4Ele.offsetTop + contentBox4Ele.offsetHeight*0.5;
      const contentBox5 = contentBox5Ele.offsetTop + contentBox5Ele.offsetHeight*0.5;
      const contentBox6 = contentBox6Ele.offsetTop + contentBox6Ele.offsetHeight*0.5;
      const contentBox7 = contentBox7Ele.offsetTop + contentBox7Ele.offsetHeight*0.5;
      const contentBox8 = contentBox8Ele.offsetTop + contentBox8Ele.offsetHeight*0.5;
      const contentBox9 = contentBox9Ele.offsetTop + contentBox9Ele.offsetHeight*0.5;
      const contentBox10 = contentBox10Ele.offsetTop;
      if (scrollTop < contentBox1) {
        this.activeIndex = 0
      } else if (scrollTop < contentBox2){
        this.activeIndex = 1
      } else if (scrollTop < contentBox3){
        this.activeIndex = 2
      } else if (scrollTop < contentBox4){
        this.activeIndex = 3
      } else if (scrollTop < contentBox5){
        this.activeIndex = 4
      } else if (scrollTop < contentBox6){
        this.activeIndex = 5
      } else if (scrollTop < contentBox7){
        this.activeIndex = 6
      } else if (scrollTop < contentBox8){
        this.activeIndex = 7
      } else if (scrollTop < contentBox9){
        this.activeIndex = 8
      } else if (scrollTop < contentBox10){
        this.activeIndex = 9
      }
    },

    drawChartIncome() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainIncome"));
      // 指定图表的配置项和数据
      let zipcodeStats = this.prop.zipcodeStats;
      let xData = []
      let yData1 = []
      let yData2 = []
      zipcodeStats.forEach((ele)=>{
        xData.push(ele.version)
        yData1.push(ele.MEDHINCCY)
        yData2.push(ele.AVGHINCCY)
      })
      let option = {
        title: {
          text: 'Median house income',
          left: 'center',
          top: 5
        },
        grid: {
          top: 100,
          left: 100
        },
        legend: {
          top: 50
        },
        tooltip: {},
        xAxis: {
          type: 'category',
          name: 'Year',
          nameLocation:  'center',
          nameTextStyle: {
            padding: 10
          },
          axisLabel :{
            interval:0,
          },
          data: xData
        },
        yAxis: {
          name: 'Median house income',
          nameLocation:  'center',
          nameTextStyle: {
            padding: 50
          },
        },
        series: [
          {
            type: 'line',
            name: this.prop.address['city'],
            data: yData1
          },
          {
            type: 'line',
            name:  zipcodeStats[0].id,
            data: yData2
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },
    drawChartAge() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainAge"));
      // 指定图表的配置项和数据
      let populationByAge = this.prop.zipcodeStats[2].populationByAge;
      let data = []
      populationByAge.forEach((ele,index)=>{
        if (populationByAge.length - 1 !== index) {
          data.push({Age: index*5 + ' - ' + ((index+1)*5 - 1), 'Population': ele})
        } else {
          data.push({Age: '85+', 'Population': ele})
        }

      })
      let option = {
        title: {
          text: 'Age Population',
          left: 'center',
          top: 5
        },
        grid: {
          top: 100
        },
        legend: {
          top: 50
        },
        tooltip: {},
        dataset: {
          dimensions: ['Age', 'Population'],
          source: data
        },
        xAxis: {
          type: 'category',
          name: 'Age',
          nameLocation:  'center',
          nameTextStyle: {
            padding: 10
          },
          axisLabel :{
            interval:0,
          },
        },
        yAxis: {
          name: 'Population',
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'}
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },

    drawChartEducation() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainEducation"));
      // 指定图表的配置项和数据
      let populationByEducation = this.prop.zipcodeStats[2].populationByEducation;
      let data = [];
      this.educationIncomeList = [];
      Object.keys(populationByEducation).forEach((ele,index)=>{
        this.educationIncomeList.push({
          id: ele,
          name: this.educationList[index],
          population: populationByEducation[ele]
        })
        data.push({Degree: this.educationList[index], 'Population': populationByEducation[ele]})
      })
      let option = {
        title: {
          text: 'Education Population',
          left: 'center',
          top: 5
        },
        grid: {
          top: 100,
          bottom: 150
        },
        legend: {
          top: 50
        },
        dataset: {
          dimensions: ['Degree', 'Population'],
          source: data
        },
        xAxis: {
          type: 'category',
          name: 'Education',
          nameLocation:  'center',
          nameTextStyle: {
            padding: [100, 10, 10, 10]
          },
          axisLabel :{
            interval:0,
            rotate: 45
          },
        },
        yAxis: {
          name: 'Population',
        },
        // Declare several bar series, each will be mapped
        // to a column of dataset.source by default.
        series: [
          {type: 'bar'},
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },
    drawChartEmployment() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainEmployment"));
      // 指定图表的配置项和数据
      let populationByOccupation = this.prop.zipcodeStats[2].populationByOccupation;
      let data = [];
      this.occupationIncomeList = [];
      Object.keys(populationByOccupation).forEach((ele,index)=>{
        this.occupationIncomeList.push({
          id: ele,
          name: this.occupationList[index],
          population: populationByOccupation[ele]
        })
        data.push({name: this.occupationList[index], value: populationByOccupation[ele]})
      })
      let option = {
        title: {
          text: 'Occupation Population',
          left: 'center',
          top: 5
        },
        grid: {
          top: 50
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Occupation',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },
    drawChartRace() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainRace"));
      // 指定图表的配置项和数据
      let populationByRace = this.prop.zipcodeStats[2].populationByRace;
      let data = [];
      this.raceIncomeList = [];
      Object.keys(populationByRace).forEach((ele,index)=>{
        this.raceIncomeList.push({
          id: ele,
          name: this.raceList[index],
          population: populationByRace[ele]
        })
        data.push({name: this.raceList[index], value: populationByRace[ele]})
      })

      let option = {
        title: {
          text: 'Race Population',
          left: 'center',
          top: 5
        },
        grid: {
          top: 50
        },
        tooltip: {
          trigger: 'item'
        },
        series: [
          {
            name: 'Occupation',
            type: 'pie',
            radius: '50%',
            data: data,
            emphasis: {
              itemStyle: {
                shadowBlur: 10,
                shadowOffsetX: 0,
                shadowColor: 'rgba(0, 0, 0, 0.5)'
              }
            }
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },
    drawChartCrimeIndex() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainCrimeIndex"));
      // 指定图表的配置项和数据
      let crimeIndex = this.prop.zipcodeStats[2].crimeIndex;
      let data = [];
      let indicator = [];
      this.crimeIndexValueList = [];
      Object.keys(crimeIndex).forEach((ele,index)=>{
        this.crimeIndexValueList.push({
          id: ele,
          name: this.crimeIndexList[index],
          index: crimeIndex[ele]
        })
        data.push(crimeIndex[ele])
        indicator.push({name: this.crimeIndexList[index], max: Math.max.apply(null, data)})
      })
      let option = {
        title: {
          text: 'Crime Index',
          left: 'center',
          top: 0
        },
        grid: {
          top: 250
        },
        radar: {
          // shape: 'circle',
          indicator: indicator
        },
        series: [{
          name: '',
          type: 'radar',
          data: [
            {
              value: data,
              name: 'crime Index'
            }
          ]
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },
    drawChartCrimeAggregate() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainCrimeAggregate"));
      // 指定图表的配置项和数据
      let crimeAggregate = this.prop.zipcodeStats[2].crimeAggregate;
      let data = [];
      let indicator = [];
      this.crimeAggregateValueList = [];
      Object.keys(crimeAggregate).forEach((ele,index)=>{
        data.push(crimeAggregate[ele])
        this.crimeAggregateValueList.push({
          id: ele,
          name: this.crimeAggregateList[index],
          index: crimeAggregate[ele]
        })
        indicator.push({name: this.crimeAggregateList[index], max:  Math.max.apply(null, data)})
      })
      let option = {
        title: {
          text: 'Crime Aggregate',
          left: 'center',
          top: 0
        },
        grid: {
          top: 250
        },
        radar: {
          // shape: 'circle',
          indicator: indicator
        },
        series: [{
          name: '',
          type: 'radar',
          data: [
            {
              value: data,
              name: 'crime Aggregate'
            }
          ]
        }]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },
    drawChartMarket() {
      // 基于准备好的dom，初始化echarts实例
      let myChart = echarts.init(document.getElementById("mainMarket"));
      // 指定图表的配置项和数据
      let option = {
        title: {
          text: ''
        },
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: ['this property', '94040', 'San Jose']
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        toolbox: {
          feature: {
            saveAsImage: {}
          }
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: ['2000', '2005', '2010', '2015', '2020']
        },
        yAxis: {
          type: 'value'
        },
        series: [
          {
            name: 'this property',
            type: 'line',
            stack: '总量',
            data: [1, 2, 1, 4, 5]
          },
          {
            name: '94040',
            type: 'line',
            stack: '总量',
            data: [2, 1, 1, 3, 4]
          },
          {
            name: 'San Jose',
            type: 'line',
            stack: '总量',
            data: [2, 3, 4, 5, 5]
          }
        ]
      };
      // 使用刚指定的配置项和数据显示图表。
      myChart.clear();
      myChart.setOption(option);
      myChart.resize();
    },
    popval() {
      if (location.search) {
        let params = location.search.substring(1);
        params.split("&").map(function (curr) {
          let p = curr.split("=");
          let k = decodeURIComponent(p[0]);
          let v = decodeURIComponent(p[1]);
          if (k && v && k in document.calc) document.calc[k].value = v;
        });
      }
    },
    downpayOnChange() {
      var housePrice = parseFloat(document.calc.housePrice.value);
      var downpay = parseFloat(document.calc.downpay.value);

      if (downpay < 0) {
        downpay = 0;
      }

      if (downpay <= 100) {
        // % not  $ 
        downpay = downpay / 100 * housePrice;
      }

      if (downpay > housePrice) {
        downpay = housePrice;
      }
      document.calc.downpay.value = downpay.toFixed(2);

      var loan = housePrice - downpay;
      if (loan || loan == 0) {
        document.calc.loanAmount.value = loan.toFixed(2);
      }
    },
    mortRateOnChange() {
      var loanAmount = parseFloat(document.calc.loanAmount.value);
      var yearsOfLoan = Math.abs(parseInt(document.calc.yearsOfLoan.value));
      var rate = Math.abs(parseFloat(document.calc.mortRate.value));

      var princ = loanAmount;
      var term = yearsOfLoan * 12;
      var intr = (rate / 1200);

      var monMortgage = princ * intr / (1 - (Math.pow(1 / (1 + intr), term)));
      var sumOfPays = term * monMortgage;
      var interestCost = sumOfPays - princ;

      if (term || term == 0)
        document.calc.numOfPays.value = term;

      if (monMortgage || monMortgage == 0)
        document.calc.monMortgage.value = monMortgage.toFixed(2);

      if (sumOfPays || sumOfPays == 0)
        document.calc.sumOfPays.value = sumOfPays.toFixed(2);

      if (interestCost || interestCost == 0)
        document.calc.interestCost.value = interestCost.toFixed(2);
    },
    monRentOnChange() {
      var tax = parseFloat(document.calc.taxRate.value);
      if (tax <= 100) {
        // %, not  $ 
        tax = tax / 1200 * parseFloat(document.calc.housePrice.value);
      } else {
        tax = tax / 12;
      }

      var ins = parseFloat(document.calc.annIns.value) / 12;
      var hoa = parseFloat(document.calc.monHOA.value);
      var other = parseFloat(document.calc.monOther.value);
      var rent = parseFloat(document.calc.monRent.value);
      var mor = parseFloat(document.calc.monMortgage.value);
      var total = rent - tax - ins - hoa - other - mor;

      if (total || total === 0)
        document.calc.monTotal.value = total.toFixed(2);
    },
    calculate_balance(PMT, IR, NP) {
      var PV = PMT * (1 - Math.pow(1 + IR, -NP)) / IR
      return PV;
    },
    loanAfterYears(years) {
      var monthly_payment = parseFloat(document.calc.monMortgage.value);
      var interest_rate = parseFloat(document.calc.mortRate.value);
      var term_remaining = parseInt(document.calc.numOfPays.value) - years * 12;

      var bal = 0;
      if (term_remaining > 0) {
        bal = this.calculate_balance(monthly_payment, interest_rate / 1200, term_remaining);
      }
      return bal;
    },
    sellAfterYears(years) {
      var apprn = parseFloat(document.calc.annAppre.value) / 100;

      var sellPrice = parseFloat(document.calc.housePrice.value);
      sellPrice = Math.pow(1 + apprn, years) * sellPrice;

      var sellingCost = parseFloat(document.calc.sellingCost.value) / 100 * sellPrice;

      var downpay = parseFloat(document.calc.downpay.value);
      var monMort = parseFloat(document.calc.monMortgage.value);


      // monthly
      var tax = parseFloat(document.calc.taxRate.value);
      if (tax <= 100) {
        tax = tax / 1200 * parseFloat(document.calc.housePrice.value);
      } else {
        tax = tax / 12;
      }
      var ins = parseFloat(document.calc.annIns.value) / 12;
      var hoa = parseFloat(document.calc.monHOA.value);
      var other = parseFloat(document.calc.monOther.value);
      var rent = parseFloat(document.calc.monRent.value);

      var totalIn = 0
      for (var i = 0; i < years; i++) {
        for (var j = 1; j <= 12; j++) {
          var monIn = rent - tax - ins - hoa - other;
          if (i * 12 + j <= parseInt(document.calc.numOfPays.value)) {
            monIn -= monMort;
          }
          totalIn += monIn
        }
        tax = (1 + apprn) * tax;
        ins = (1 + apprn) * ins;
        // eslint-disable-next-line no-self-assign
        hoa = hoa;
        // eslint-disable-next-line no-self-assign
        other = other;
        rent = (1 + parseFloat(document.calc.annAnRtInc.value) / 100) * rent;
      }

      // at sell
      var totalLoanPay = parseFloat(document.calc.loanBal.value) + downpay + Math.min(years * 12, parseInt(document.calc.numOfPays.value)) * monMort;

      var apprnGain = sellPrice - sellingCost -
          parseFloat(document.calc.loanBal.value) - downpay;

      var totalEarn = apprnGain + totalIn;

      var ar = Math.pow((totalEarn + downpay) / downpay, (1 / years)) - 1;
      ar = 100 * ar;

      var ret = {
        year: years, lastRent: rent, sellPrice: sellPrice, sellingCost: sellingCost, apprnGain: apprnGain,
        totalLoanPay: totalLoanPay, totalIn: totalIn, totalEarn: totalEarn, annualReturn: ar
      };
      console.log(JSON.stringify(ret));
      return ret;
    },
    showpay() {
      this.downpayOnChange();
      this.mortRateOnChange();
      this.monRentOnChange();

      var data = {
        labels: [], series: [[]]
      };
      for (var i = 1; i <= 30; i++) {
        var bal = this.loanAfterYears(i);
        document.calc.loanBal.value = bal.toFixed(2);
        var ret = this.sellAfterYears(i);
        data.labels.push(i);
        data.series[0].push(ret.annualReturn);
      }
      // this. $ Chartist.Line('.ct-chart', data);
      this.chartData = data

      var years = parseInt(document.calc.afterYears.value);
      bal = this.loanAfterYears(years);
      document.calc.loanBal.value = bal.toFixed(2);
      ret = this.sellAfterYears(years);
      document.calc.sellPrice.value = ret.sellPrice.toFixed(2);
      document.calc.totalEarn.value = ret.totalEarn.toFixed(2);
      document.calc.annualReturn.value = ret.annualReturn.toFixed(2);
      document.calc.monRentLastYear.value = ret.lastRent.toFixed(2);
      // document.calc.loanPaid.value = ret.totalLoanPay.toFixed(2);
      document.calc.cashTotal.value = ret.totalIn.toFixed(2);
      document.calc.totalApprn.value = ret.apprnGain.toFixed(2);
    },
    shareUrl() {
      var inputs = document.calc;
      var params = "?";
      var l = inputs.length;
      for (var i = 0; i < l; i++) {
        var input = inputs[i];
        if (input.type !== 'button' && input.type !== 'reset' && input.name)
          params += encodeURIComponent(input.name) + "=" + encodeURIComponent(input.value) + "&";
      }

      var url = [location.protocol, '//', location.host, location.pathname, params].join('');

      var shareUrl = document.getElementById("shareUrl");
      shareUrl.value = url;
      shareUrl.select();
      document.execCommand("copy");
      alert("Copied url to clipboard");
    }


  },
  created: function () {
    this.query = sessionStorage.getItem('browseParam')
    const query = {'id': [this.$route.params.id]}
    const query_json = JSON.stringify(query)
    axios.get(this.$backendURL + '/browse?query=' + query_json)
        .then(res => {
          this.detail = res.data[0];
          this.prop = this.detail;
          let housePicList = [];
          let mediaURLs = this.detail.mlsListing.MediaURLs;
          for (let i = 0, len = mediaURLs.length; i < len; i++) {
            if (mediaURLs[i].category === 'Photo') {
              housePicList.push(mediaURLs[i].url)
            }
          }
          this.housePicList = housePicList.slice(0, 10)
        })
        .catch(err => {
          console.log(err)
          this.$router.push({name: 'pagenotfound'})
        });
  },
  computed: {
    google: gmapApi
  },
  mounted() {

    const that = this;

    setTimeout(() => {
      that.drawChartIncome();
      that.drawChartCrimeIndex();
      that.drawChartMarket();
      that.$refs.gmap.$mapPromise.then((map) => {
        let options = {
          map: map,
          url: `https://raw.githubusercontent.com/suredream/hpp_noise_layers/main/Road_noise.kml?dummy=` + (new Date()).getTime()
        }
        let kml = new that.google.maps.KmlLayer(options);
        console.log(kml)
      })

    },1000)
    console.log('mounted');
    window.addEventListener("scroll", this.handleScroll);
    setTimeout(() => {
      const width = window.innerWidth || document.documentElement.clientWidth || document.body.clientWidth;
      console.log(document.getElementsByClassName('carousel-img1'));
      console.log(document.getElementsByClassName('carousel-img1').length);
      if (document.getElementsByClassName('carousel-img1')) {
        const carouselImgHeight = document.getElementsByClassName('carousel-img1')[0].offsetHeight;
        console.log(carouselImgHeight);
        if (width < 767) {
          that.carouselHeight = carouselImgHeight + 'px';
        }
      }

    }, 1000);



  }
}

</script>
<style scoped lang="less">
.detail-container {
  height: 100%;
  overflow: scroll;
  padding-top: 60px;
}
.breadcrumb {
  border-top: 2px solid #aba490;
  background: #f8f8f8;

  .nav {
    max-width: 1200px;
    padding: 15px 0;
    text-align: left;
    margin: 0 auto;
    color: #666;
  }

  @media screen and (max-width: 767px) {
    padding: 0 10px;
  }
}

.detail-content,
.house-list {
  max-width: 1200px;
  margin: 0 auto;
}

.detail-box1 {
  .detail-left {
    width: 792px;
  }

  .detail-right {
    width: 390px;
    border: 1px solid #e5e5e5;
  }

  .title {
    padding: 10px;
    text-align: left;
    background: #f7f7f7;

    h1 {
      padding: 10px 0;
      font-size: 24px;
      font-weight: bold;
      color: #333;
    }

    h3 {
      color: #666;
    }
  }

  .sub-tit {
    padding: 20px 10px 0 10px;
    text-align: left;
    font-size: 20px;
    font-weight: bold;
    color: #333;
  }

  .spec {
    text-align: left;
    padding: 10px;

    .btn {
      display: inline-block;
      padding: 8px 12px;
      border: 1px solid #e5e5e5;
      margin-right: 10px;
      border-radius: 4px;
      font-size: 12px;

      strong {
        font-weight: bold;
      }
    }
  }

  .tags-list {
    padding: 0 10px;
    text-align: left;

    .tag {
      display: inline-block;
      padding: 8px 12px;
      background: #e9f0f5;
      margin-right: 5px;
      margin-bottom: 5px;
      color: #555;
      font-size: 12px;
    }
    .pros {
      background: #67C23A;
    }
    .cons {
      background: #E6A23C
    }
  }

  .price {
    padding: 8px 22px;
    text-align: left;
    color: #e22222;
    font-size: 28px;
    font-weight: bold;
  }

  .invest {
    padding-top: 10px;
    padding-bottom: 15px;
    text-align: center;

    .btn {
      display: inline-block;
      width: 85%;
      padding: 10px;
      border-radius: 10px;
      font-size: 24px;
      font-weight: bold;
      text-align: center;
      color: #fff;
      background: #e22222;
      cursor: pointer;
    }
  }

  @media screen and (max-width: 767px) {
    padding: 0 10px;
    .detail-left {
      width: 100%;

      img {
        max-width: 100%;
        height: auto;
      }
    }

    .detail-right {
      margin-top: 10px;
      width: 100%;
    }

    .price {
      font-size: 24px;
    }

    .invest {
      .btn {
        padding: 8px;
        font-size: 18px;
      }
    }
  }
}

.detail-box2 {
  padding-top: 15px;

  .tabs {
    background: #f2f5f5;

    li {
      float: left;
      font-size: 16px;
      padding: 15px;
      color: #333;
      cursor: pointer;

      &.active {
        background: #d9aa29;
        color: #fff;
      }
    }

    &.fixedTabs {
      position: fixed;
      top: 0;
      width: 1200px;
      z-index: 999;
    }
  }

  .tab-content {
    padding-top: 20px;
    text-align: center;
    .content-box {
      h2 {
        font-size: 18px;
        font-weight: 600;
        margin: 30px 0;
        padding-bottom: 25px;
        border-bottom: 1px solid #ddd;
        text-align: left;
      }
    }

    .table {
      border-collapse: collapse;
      margin: 0 auto;
      text-align: center;

      th {
        border: 1px solid #cccccc;
        color: #fff;
        background: #b2a172;
        padding: 16px 90px;
        font-weight: bold;

        &:first-child {
          padding: 16px 22px;
        }
      }

      td {
        border: 1px solid #cccccc;
        color: #333;
        font-size: 16px;
        padding: 16px 50px;
        line-height: 6px;

        &:first-child {
          padding: 16px 22px;
        }
      }
    }
  }

  @media screen and (max-width: 767px) {
    .tabs {
      li {
        float: left;
        font-size: 14px;
        padding: 7px 10px;
      }

      &.fixedTabs {
        position: fixed;
        top: 0;
        width: 100%;
      }
    }

    .tab-content {
      padding-top: 30px;

      .table {
        th {
          padding: 8px 12px;

          &:first-child {
            padding: 8px 8px;
          }
        }

        td {
          border: 1px solid #cccccc;
          color: #333;
          font-size: 16px;
          padding: 8px 15px;
          line-height: 5px;
          &:first-child {
            padding: 8px 8px;
          }
        }
      }
    }
  }
}

.house-list-container {
  margin-top: 60px;
  padding-bottom: 50px;
  background: #f8f8f8;
}

.house-list {
  padding: 20px 0;

  ul.tab-nav {
    padding-bottom: 20px;

    li {
      float: left;
      padding: 8px 22px;
      font-size: 16px;
      color: #333;
      cursor: pointer;

      &.active {
        border-bottom: 2px solid #d9aa29;
        color: #d9aa29;
      }
    }
  }

  ul.tab-content {
    li {
      float: left;
      padding: 0;
      width: 23.5%;
      margin-right: 2%;
      box-sizing: border-box;
      background: #fff;
      border-radius: 6px;

      &:last-child {
        margin-right: 0;
      }
    }
  }

  .swiper-box {
    display: none;
  }

  .price {
    font-size: 26px;
    font-weight: bold;
  }

  .title {
    padding: 10px 0;
    font-size: 14px;
    text-align: left;
  }

  .specs {
    text-align: left;
    font-size: 12px;

    strong {
      font-weight: bold;
    }

    span {
      display: inline-block;
      padding-right: 10px;
    }
  }

  .btn {
    display: inline-block;
    border: 1px solid #464646;
    width: 210px;
    height: 34px;
    line-height: 34px;
    margin-top: 50px;
    margin-bottom: 25px;
    border-radius: 5px;
    color: #585858;
    cursor: pointer;
  }

  @media screen and (max-width: 767px) {
    ul.tab-content {
      display: none;

      li {
        width: 100%;
        margin-right: 0;
        margin-bottom: 10px;
      }
    }

    .swiper-box {
      display: block;
    }

    .price {
      font-size: 16px;
    }
  }
}

.demographics {
  text-align: center;
}

.top-title {
  width: 80%;
  margin: 0 auto;
  text-align: center;
  box-sizing: border-box;
  padding-bottom: 20px;
}

.top-title li {
  width: 80%;
  margin: 0 auto;
  padding: 7px;
  box-sizing: border-box;
  border: 1px solid #999;
  border-bottom: none;
}

.top-title li:last-child {
  border-bottom: 1px solid #999;
}

.top-title-left {
  float: left;
  width: 50%;
  padding: 10px;
  box-sizing: border-box;
  border: 1px solid #999;
}

.top-title-right {
  float: left;
  width: 50%;
  padding: 10px;
  border: 1px solid #999;
  border-left: 0;
  box-sizing: border-box;
  min-height: 38px;
}

.potential .top-title-right {
  text-align: left;
}
.potential .top-title-left {
  text-align: right;
}
.el-tabs__item.is-active {
  color: #d9aa29 !important;
}

.el-tabs__item:hover {
  color: #d9aa29 !important;
}
.gs-rating-col .ellipse {
  background-color: #f5f5f5;
  border-radius: 50%;
  width: 56px;
  height: 56px;
  font-size: 18px;
  text-align: center;
  line-height: 56px;
}
 .gs-rating-col .ellipse .gs-rating-text .rating-num {
  font-weight: 600;
  font-size: 18px;
}
.gs-rating-col .ellipse .gs-rating-text .out-of {
  font-size: .75rem;
}
.rating-and-name-col .name-col {
  min-width: 275px;
  width: 40%;
  text-align: left;
  margin-top: auto;
  margin-bottom: auto;
}
.basic-table-3 {
  width: 70%;
  margin: 0 auto;
}
.basic-table-3 td {
  padding-bottom: 20px;
}
.investment td {
  width: 25%;
}
.investment tr td:nth-child(2n+1) {
  text-align: left;
}
.investment tr td:nth-child(2n+2) {
  text-align: right;
}
.investment .el-input__inner {
  width: 60%;
  height: 32px;
  line-height: 32px;
}
.investment .table tr td {
  padding: 6px 10px !important;
}
.investment .calculate {
  width: 80%;
  margin: 0 auto;
  padding-top: 20px;
}
.el-button:active {
  color: #efe6cc;
  border-color: #d9aa29;
  outline: none;
}
.el-button:focus, .el-button:hover {
  color: #d9bc6d;
  border-color: #D9BC6D;
  background-color: #EFE6CC;
}
.ct-major-second.ct-nodata, .ct-major-second {
  height: 350px;
  position: relative;
  overflow: hidden;
}
.tooltip {
  position: relative;
  display: inline-block;
}

.tooltip .tooltiptext {
  visibility: hidden;
  width: 120px;
  background-color: black;
  color: #fff;
  text-align: center;
  border-radius: 6px;
  padding: 5px 0;
  position: absolute;
  z-index: 1;
  bottom: 101%;
  left: 50%;
  margin-left: -60px;
  /* 淡入 - 1秒内从 0% 到 100% 显示: */
  opacity: 0;
  transition: opacity 1s;
}

.tooltip:hover .tooltiptext {
  visibility: visible;
  opacity: 1;
}
.tooltip .tooltiptext::after {
  content: "";
  position: absolute;
  top: 100%;
  left: 50%;
  margin-left: -5px;
  border-width: 5px;
  border-style: solid;
  border-color: black transparent transparent transparent;
}
</style>
