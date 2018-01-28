import { Glass } from '../models/visualisation';

export const GLASS_DATA: Glass[] = [
  {
    id           : 1,
    name         : 'glass_1',
    maskHeight   : 29,
    maskTopMargin: 1,
    path         : `m 36.859205,296.89163 c 0,0 0.181959,-0.91939 -0.398941,-1.20985 l -10.435602,-3.56571
    c 0,0 -0.05525,-1.15923 -0.377976,-1.41741 -0.387267,-0.48408 -1.039434,-0.75595 -1.039434,-0.75595
    v -20.76082 c 0,-0.45181 0.398389,-1.76519 2.173361,-3.02381 1.678156,-1.38771 2.935017,-2.9845
    3.874257,-4.81919 1.295386,-2.53039 1.278981,-5.55585 2.267858,-8.22099 0.489186,-1.31842
    0.766071,-2.86375 1.802353,-3.81435 1.534934,-1.40803 4.168423,-0.95609 5.858632,-2.17337
    1.46446,-1.05469 2.668469,-2.56553 3.394818,-4.21763 0.759956,-1.72854 0.990818,-5.21315
    0.850446,-5.60046 -0.09016,-0.24875 -0.657386,-0.2057 -0.793523,0.0212 -0.09682,0.16136
    -0.07043,3.49234 -0.753629,5.05183 -0.724189,1.65305 -1.930358,3.16294 -3.394818,4.21763
    -1.690209,1.21728 -4.323698,0.76534 -5.858632,2.17337 -1.036282,0.9506 -1.313167,2.49593
    -1.802353,3.81435 -0.988877,2.66514 -0.979692,5.68692 -2.267858,8.22099 -0.705616,1.38808
    -1.227934,2.26968 -2.90609,3.6574 -1.774972,1.25862 -2.436294,1.05517 -4.809553,1.08606
    -2.373258,-0.0337 -2.481197,0.16974 -4.256169,-1.08888 -1.678156,-1.38771 -2.200475,-2.26931 -2.90609,-3.65739
    -1.288168,-2.53407 -1.278982,-5.55585 -2.267858,-8.22099 -0.489186,-1.31842 -0.766071,-2.86375
    -1.802353,-3.81435 -1.5349345,-1.40803 -4.1684233,-0.95609 -5.8586325,-2.17337 -1.4644601,-1.05469
    -2.6706292,-2.56458 -3.394818,-4.21763 -0.6832016,-1.55949 -0.656813,-4.89047 -0.753629,-5.05183
    -0.13613701,-0.2269 -0.70336195,-0.26995 -0.79352295,-0.0212 -0.14037202,0.38731 0.0904904,3.87192
    0.85044595,5.60046 0.726349,1.6521 1.9303579,3.16294 3.394818,4.21763 1.6902092,1.21728 4.323698,0.76534
    5.8586325,2.17337 1.036282,0.9506 1.313167,2.49593 1.802353,3.81435 0.988876,2.66514 0.972472,5.69061
    2.267858,8.22099 0.939239,1.83469 2.196101,3.43148 3.874257,4.81919 1.774972,1.25862 2.173361,2.572
    2.173361,3.02381 v 20.76082 c 0,0 -0.652167,0.27187 -1.039434,0.75595 -0.322726,0.25818 -0.377976,1.41741
    -0.377976,1.41741 l -10.4356025,3.56571 c -0.5809,0.29045 -0.398941,1.20985 -0.398941,1.20985 z`,
    mask         : `m 43.972295,237.75545 c -0.0081,0.25817 -0.06439,3.20049 -0.690469,4.62966 -0.724157,1.65306
    -1.930358,3.16294 -3.394818,4.21763 -1.690209,1.21728 -4.323699,0.76534 -5.858632,2.17337 -1.036283,0.9506
    -1.313167,2.49593 -1.802352,3.81435 -0.988878,2.66514 -0.979694,5.68692 -2.26786,8.22099 -0.705615,1.38808
    -1.227934,2.26968 -2.906089,3.6574 -1.774973,1.25862 -2.436295,1.05518 -4.809554,1.08607 -2.373258,-0.0337
    -2.481197,0.16973 -4.256169,-1.08889 -1.678156,-1.38771 -2.200475,-2.26931 -2.90609,-3.65739 -1.288168,-2.53407
    -1.278982,-5.55585 -2.267858,-8.22099 -0.489186,-1.31842 -0.766071,-2.86375 -1.802353,-3.81435
    -1.5349342,-1.40803 -4.1684231,-0.95609 -5.8586323,-2.17337 -1.46446,-1.05469 -2.667299,-2.56604
    -3.394818,-4.21763 -0.6278193,-1.42525 -0.645403,-4.10318 -0.7079892,-4.61825 12.2431975,0.0655
    29.9732025,0.0114 42.9236835,-0.009 z`
  },
  {
    id           : 2,
    name         : 'glass_2',
    maskHeight   : 57,
    maskTopMargin: 1,
    path         : `m 29.086658,296.55503 c 0,0 1.326887,-0.0874 1.827842,-0.46759 0.439989,-0.33394 0.827404,-0.49985
    0.827404,-1.43574 l 0.07384,-2.9342 0.122043,-4.62863 0.504184,-14.75783 c 0,0 0.181728,-4.038 0.258178,-6.05758
    0.07383,-1.95025 0.143014,-3.90074 0.193634,-5.85172 0.05937,-2.28816 0.07132,-4.57737 0.129088,-6.86556
    0.03429,-1.35798 0.107569,-2.71494 0.129089,-4.07318 0.01147,-0.72427 0,-2.17307 0,-2.17307 v -4.21763
    c 0,0 0.182012,-5.21315 0.04164,-5.60046 -0.09016,-0.24875 -0.657386,-0.2057 -0.793523,0.0212 -0.09682,0.16136
    -0.123427,3.36734 -0.148117,5.05183 -0.02061,1.40589 0,2.81209 0,4.21813 v 2.173 l -0.129089,4.45945
    c -0.07929,2.73918 -0.482595,23.03627 -1.294132,34.52358 -0.138556,1.96125 -0.29045,4.99965 -0.609929,5.86681
    -0.524858,0.84434 -5.119572,0.55326 -7.49283,0.58696 -2.373257,-0.0337 -6.967972,0.25737 -7.49283,-0.58696
    -0.319479,-0.86717 -0.471373,-3.90556 -0.609929,-5.86681 -0.811538,-11.48732 -1.21484,-31.78441
    -1.294132,-34.52359 L 13.2,248.95599 v -2.173 c 0,-1.40604 0.02061,-2.81224 0,-4.21813 -0.02469,-1.68449
    -0.0513,-4.89047 -0.148117,-5.05183 -0.136137,-0.2269 -0.703362,-0.26995 -0.793523,-0.0212 -0.140372,0.38731
    0.04164,5.60046 0.04164,5.60046 v 4.21763 c 0,0 -0.01147,1.4488 0,2.17307 0.02152,1.35824 0.0948,2.7152
    0.129089,4.07318 0.05777,2.28819 0.06972,4.5774 0.129088,6.86556 0.05062,1.95098 0.119808,3.90147
    0.193634,5.85172 0.07645,2.01959 0.258178,6.05758 0.258178,6.05758 l 0.504184,14.75783 0.122043,4.62864
    0.07384,2.9342 c 0,0.93588 0.387415,1.1018 0.827404,1.43574 0.500956,0.38021 1.827843,0.46758 1.827843,0.46758 z`,
    mask         : `m 32.351669,238.07779 c -0.03228,0.5809 -0.08309,2.9911 -0.09971,4.48707 -0.01562,1.40596
    0,2.81209 0,4.21813 v 2.173 l -0.129089,4.45945 c -0.07929,2.73918 -0.482595,23.03627 -1.294132,34.52359
    -0.138556,1.96124 -0.29045,4.99964 -0.609929,5.86681 -0.524858,0.84433 -5.119572,0.55326 -7.49283,0.58696
    -2.373257,-0.0337 -6.967972,0.25736 -7.49283,-0.58696 -0.319479,-0.86718 -0.471373,-3.90557 -0.609929,-5.86681
    -0.811538,-11.48733 -1.21484,-31.78442 -1.294132,-34.5236 L 13.2,248.95598 v -2.173 c 0,-1.40604 0.01556,-2.81217
    0,-4.21813 -0.01662,-1.50134 -0.0513,-4.18048 -0.09971,-4.5032 7.098985,0.10887 15.60373,-0.0223 19.251379,0.0161 z`
  },
  {
    id           : 3,
    name         : 'glass_3',
    maskHeight   : 32,
    maskTopMargin: 2,
    path         : `m 33.87425,294.6311 c 5.499598,0.7074 7.056207,1.76313 7.189864,1.4886 0.104584,-0.21481
    -0.576121,-1.05879 -1.028249,-1.43574 -1.586876,-1.32303 -3.999911,-1.34419 -5.606072,-2.64374
    -2.390758,-1.93439 -4.67342,-4.404 -5.590139,-7.33951 -0.537007,-1.71959 -0.286415,-3.67787 0.246005,-5.39889
    0.537398,-1.73711 1.587708,-3.3506 2.872228,-4.6376 1.270816,-1.27326 4.196162,-2.31928 4.582657,-2.85039
    0.394866,-0.54264 1.490663,-4.8057 2.065421,-7.25284 0.691133,-2.94263 1.090479,-5.94631 1.658647,-8.91513
    0.293324,-1.53269 0.629535,-3.05724 0.903622,-4.59349 0.413799,-2.31932 0.748478,-4.65207 1.118176,-6.97883
    0.297764,-1.87404 1.026348,-5.23597 0.885976,-5.62328 -0.09016,-0.24875 -0.657386,-0.2057 -0.793523,0.0212
    -0.09682,0.16136 -0.690668,3.37768 -0.992453,5.07465 -0.412534,2.31972 -0.704358,4.65985 -1.118176,6.97933
    -0.274077,1.53623 -0.903622,4.59342 -0.903622,4.59342 l -2.013641,9.07549 c -0.59358,2.67528 -1.672795,3.73825
    -2.520477,4.3168 -1.455545,0.99341 -4.175594,1.53838 -6.354385,1.92959 -1.783924,0.32079 -3.054151,0.29509
    -5.427407,0.32879 -2.373257,-0.0337 -3.643483,-0.008 -5.427408,-0.32878 -2.17879,-0.39121 -4.898839,-0.93619
    -6.354384,-1.9296 -0.847682,-0.57854 -1.9268966,-1.64152 -2.5204766,-4.31679 l -2.0136412,-9.07549 c 0,0
    -0.6295453,-3.05719 -0.9036223,-4.59342 -0.4138178,-2.31948 -0.7056423,-4.65961 -1.1181754,-6.97933
    -0.3017853,-1.69697 -0.8956366,-4.91329 -0.9924536,-5.07465 -0.136137,-0.2269 -0.703362,-0.26995
    -0.793523,-0.0212 -0.140372,0.38731 0.5882118,3.74924 0.8859766,5.62328 0.3696972,2.32676 0.7043769,4.65951
    1.1181754,6.97883 0.2740874,1.53625 0.6102985,3.0608 0.9036223,4.59349 0.5681678,2.96882 0.9675138,5.9725
    1.6586468,8.91513 0.5747577,2.44714 1.6705546,6.7102 2.0654213,7.25283 0.3864951,0.53112 3.3118407,1.57714
    4.5826567,2.8504 1.28452,1.28699 2.33483,2.90049 2.872227,4.6376 0.532421,1.72102 0.783013,3.67929
    0.246006,5.39888 -0.916719,2.93551 -3.199381,5.40513 -5.590139,7.33951 -1.606161,1.29956 -4.0191957,1.32071
    -5.6060716,2.64375 -0.4521287,0.37695 -1.132833,1.22093 -1.0282489,1.43574 0.1336562,0.27452 1.6902655,-0.7812
    7.1898635,-1.48861 7.228978,-0.5809 11.84034,-1.1618 21.651096,0 z`,
    mask         : `m 42.281878,238.79663 c -0.06829,0.26976 -0.618766,3.16236 -0.895467,4.74947 -0.404667,2.3211
    -0.704358,4.65985 -1.118176,6.97933 -0.274077,1.53623 -0.903621,4.59342 -0.903621,4.59342 l -2.013644,9.07549
    c -0.593579,2.67528 -1.672793,3.73825 -2.520476,4.3168 -1.455544,0.99341 -4.175593,1.53838 -6.354384,1.92959
    -1.783924,0.3208 -3.054151,0.29509 -5.427408,0.32879 -2.373256,-0.0337 -3.643483,-0.008 -5.427407,-0.32878
    -2.178791,-0.39121 -4.89884,-0.93619 -6.354385,-1.9296 -0.847682,-0.57853 -1.9268962,-1.64152 -2.5204762,-4.31679
    l -2.0136411,-9.07549 c 0,0 -0.6295453,-3.05719 -0.9036224,-4.59342 -0.4138178,-2.31948 -0.7099884,-4.65885
    -1.1181754,-6.97933 -0.2799397,-1.59142 -0.8442918,-4.53676 -0.9125839,-4.76088 14.543458,0.0868
    24.46369,0.0659 38.483467,0.0114 z`
  }
];
