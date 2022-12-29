#include<iostream>
#include<bits/stdc++.h>
using namespace std;
int hack_func(int a[], int n)
{
    unordered_set<int> s(a,a+n);
    int sumarr=accumulate(a,a+n,0);
    int sumset=accumulate(s.begin(), s.end());
    return (3*sumset-sumarr)/2;
}
int main()
{
    int a[]={12,1,12,3,12,1,1,2,3,2,2,3,7};
    int n=sizeof(a)/sizeof(a[0]);
    cout<<hack_func(a,n)<<" ";
    return 0;
}