<!-- type added -->
Ref https://github.com/grpc/proposal/blob/master/L70-node-proto-loader-type-generator.md
Ref https://www.npmjs.com/package/@grpc/proto-loader

you can visit these two url for adding type in grpc  bcz we are using the typescript

./node_modules/@grpc/proto-loader/build/bin/proto-loader-gen-types.js  --longs=String --enums=String --defaults --oneofs --grpcLib=@grpc/grpc-js --outDir=generated ./src/a.proto     
<!-- use in git bash -->


and move generated file to src
